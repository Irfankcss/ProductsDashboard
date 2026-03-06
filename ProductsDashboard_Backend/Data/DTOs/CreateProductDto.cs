namespace ProductsDashboard_Backend.Data.DTOs
{
    public class CreateProductDto
    {
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public float Price { get; set; }
        public string ImageUrl { get; set; } = "";
        public int CategoryId { get; set; }
    }
}
