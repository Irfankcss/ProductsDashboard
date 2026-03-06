using Meilisearch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsDashboard_Backend.Data;
using ProductsDashboard_Backend.Data.DTOs;
using ProductsDashboard_Backend.Data.Models;

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
        public async Task<IActionResult> Search([FromQuery] string q, [FromQuery] int? categoryId)
        {
            q ??= "";

            var index = _meiliClient.Index("products");

            var query = new SearchQuery { Limit = 10 };

            if (categoryId.HasValue && categoryId.Value > 0)
                query.Filter = $"categoryId = {categoryId.Value}";

            var result = await index.SearchAsync<ProductSearchDto>(q, query);
            return Ok(result.Hits);
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
