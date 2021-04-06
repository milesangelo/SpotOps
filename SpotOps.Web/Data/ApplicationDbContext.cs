using SpotOps.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace SpotOps.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="options"></param>
        /// <param name="operationalStoreOptions"></param>
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
            
        }
        
        /// <summary>
        /// 
        /// </summary>
        public DbSet<ApplicationUser> Users { get; set; }
        
        /// <summary>
        /// 
        /// </summary>
        public DbSet<Group> Groups { get; set; }
        
        /// <summary>
        /// 
        /// </summary>
        public DbSet<Spot> Spots { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public DbSet<SpotImage> SpotImages { get; set; }
        
    }
}
