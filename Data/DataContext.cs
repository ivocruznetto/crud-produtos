using Microsoft.EntityFrameworkCore;

namespace jetWebApi.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) { }
        
        // Apontamento para a classe
        public DbSet<Product> Products { get; set; }
        
    }
}
