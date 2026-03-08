using Meilisearch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsDashboard_Backend.Data;
using ProductsDashboard_Backend.Data.DTOs;
using ProductsDashboard_Backend.Data.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ProductsDashboard_Backend.Controllers
{
    public class MeilSearchController : ControllerBase
    {
        private readonly MeilisearchClient _meiliClient;
        private readonly AppDbContext _context;
        public MeilSearchController(MeilisearchClient meiliclient, AppDbContext context) {
            _meiliClient = meiliclient;
            _context = context;
        }

        [HttpGet("api/search")]
        public async Task<IActionResult> Search([FromQuery] string q, [FromQuery] int? categoryId, [FromQuery] int currentPage = 1, [FromQuery] int pageSize = 4)
        {
            if (currentPage <= 0)
                currentPage = 1;
            if (pageSize <= 0)
                pageSize = 4;
            string? filter = null;
            q ??= "";

            var index = _meiliClient.Index("products");
            if (categoryId.HasValue && categoryId.Value > 0)
                filter = $"categoryId = {categoryId.Value}";
            var query = new SearchQuery { Limit = 10000, Filter = filter };
            var result = await index.SearchAsync<ProductSearchDto>(q, query);
            var totalCount = result.Hits?.Count ?? 0;

            var offset = (currentPage - 1) * pageSize;
            query = new SearchQuery { Limit = pageSize, Offset = offset , Filter = filter };
            result = await index.SearchAsync<ProductSearchDto>(q, query);
            return Ok(new
            {
                CurrentPage = currentPage,
                PageSize = pageSize,
                Data = result.Hits,
                TotalCount = totalCount
            });
        }

        [HttpPost("reindex")]
        public async Task<IActionResult> Reindex()
        {
            var products = await _context.Products.Include(p=>p.Category)
                .Select(p => new ProductSearchDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    ImageUrl = p.ImageUrl,
                    CategoryId = p.CategoryId
                })
                .ToListAsync();

            var index = _meiliClient.Index("products");
            await index.DeleteAllDocumentsAsync();
            await index.UpdateFilterableAttributesAsync(new[] { "categoryId" });
            await index.AddDocumentsAsync(products);

            return Ok("Indexed");
        }



    }
}
