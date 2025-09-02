using Microsoft.EntityFrameworkCore;
using SemaApi.Domain;

namespace SemaApi.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Visitor> Visitors { get; set; }
    }
}
