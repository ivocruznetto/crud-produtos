using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace jetWebApi
{
    public class Product
    {
        public int Id { get; set; }
        [StringLength(150)]
        public string ProductName { get; set; } = string.Empty;
        [StringLength(200)]
        public string ProductDescription { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public int Stock { get; set; }
        public bool Status { get; set; }
        public decimal Price { get; set; }
    }
}