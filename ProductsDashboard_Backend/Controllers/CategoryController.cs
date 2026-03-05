using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsDashboard_Backend.Data;
using ProductsDashboard_Backend.Data.DTOs;
using ProductsDashboard_Backend.Data.Models;

namespace ProductsDashboard_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CategoryController(AppDbContext dbContext) {
            _context = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category[]>>> GetAllCategories()
        {
            var categories = await _context.Categories.OrderBy(c => c.Id).ToListAsync();
            return Ok(categories);
        }

        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory(CreateCategoryDto category)
        {
            await _context.Categories.AddAsync(new Category { IconUrl = category.IconUrl, Name = category.Name });
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
