namespace ProductsDashboard_Backend.Data.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public float Price { get; set; }
        public string ImageUrl { get; set; } = "";

    }
}
