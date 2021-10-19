using Microsoft.EntityFrameworkCore;
using SpotOps.Web.Models;

namespace SpotOps.Web.Data
{
    public class SpotOpsDbContext : DbContext
    {
        public SpotOpsDbContext(DbContextOptions<SpotOpsDbContext> options) : base(options)
        {
            
        }

        public DbSet<Spot> Spots { get; set; }
    }
}