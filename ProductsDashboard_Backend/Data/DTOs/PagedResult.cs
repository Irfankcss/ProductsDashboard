namespace ProductsDashboard_Backend.Data.DTOs
{
    public class PagedResult<T>
    {
        public List<T> Data { get; set; } = new List<T>();
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public int TotalCount { get; set; }

    }
}
