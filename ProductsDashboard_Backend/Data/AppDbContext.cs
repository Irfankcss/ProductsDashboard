using Microsoft.EntityFrameworkCore;
using ProductsDashboard_Backend.Data.Models;

namespace ProductsDashboard_Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
    }
}
