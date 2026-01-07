using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsDashboard_Backend.Data.Models;
using ProductsDashboard_Backend.Data;
using ProductsDashboard_Backend.Data.DTOs;
using Meilisearch;
using System.Xml.Linq;

namespace ProductsDashboard_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly MeilisearchClient _meiliClient;
        public ProductsController(AppDbContext context, MeilisearchClient meiliClient)
        {
            _meiliClient = meiliClient;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
            return await _context.Products.OrderBy(p => p.Id).ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetById(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound();

            return product;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Create(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            var searchDto = new ProductSearchDto
            {
                Id=product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                ImageUrl = product.ImageUrl
            };
            await _meiliClient.Index("products")
                .AddDocumentsAsync(new[] { searchDto });

            return CreatedAtAction(
                nameof(GetById),
                new { id = product.Id },
                product
            );
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, EditProductDto dto)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.ImageUrl = dto.ImageUrl;

            await _context.SaveChangesAsync();

            var searchDto = new ProductSearchDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                ImageUrl = product.ImageUrl
            };

            await _meiliClient
                .Index("products")
                .AddDocumentsAsync(new[] { searchDto });

            return Ok(product);
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            await _meiliClient
                .Index("products").DeleteOneDocumentAsync(id);

            return NoContent();
        }
    }
}
