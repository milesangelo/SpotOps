using System.Threading.Tasks;
using SpotOps.Models;

namespace SpotOps.Services
{
    public interface IUserService
    {
        public Task<ApplicationUser> GetById(string userId);
    }
}