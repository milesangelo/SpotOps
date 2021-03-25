using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SpotOps.Data;

namespace SpotOps.Tests
{
    public class MockDbContextOptions
    {
        public DbContextOptions<ApplicationDbContext> CreateNewContextOptions()
        {
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
            builder.UseInMemoryDatabase("SpotOpsDatabase")
                .UseInternalServiceProvider(serviceProvider);

            return builder.Options;
        }
    }
}