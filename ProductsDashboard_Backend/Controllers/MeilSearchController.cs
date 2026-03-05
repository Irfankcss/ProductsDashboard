using Meilisearch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsDashboard_Backend.Data;
using ProductsDashboard_Backend.Data.DTOs;

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
        public async Task<IActionResult> Search([FromQuery] string q)
        {
            if (string.IsNullOrWhiteSpace(q))
                return Ok(Array.Empty<ProductSearchDto>());

            var index = _meiliClient.Index("products");

            var result = await index.SearchAsync<ProductSearchDto>(
                q,
                new SearchQuery
                {
                    Limit = 10
                });

            return Ok(result.Hits);
        }

        [HttpPost("reindex")]
        public async Task<IActionResult> Reindex()
        {
            var products = await _context.Products
                .Select(p => new ProductSearchDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    ImageUrl = p.ImageUrl
                })
                .ToListAsync();

            var index = _meiliClient.Index("products");
            await index.AddDocumentsAsync(products);

            return Ok("Indexed");
        }



    }
}
