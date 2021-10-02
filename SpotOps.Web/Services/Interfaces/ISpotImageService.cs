using System.Collections.Generic;
using System.Threading.Tasks;
using SpotOps.Models;

namespace SpotOps.Services
{
    public interface ISpotImageService
    {
        Task<List<SpotImage>> GetAll();
        Task<SpotImage> GetBySpotId(int spotId);
        Task AddAsync(SpotImage spotImage);
        Task<int> Remove(int spotId);
    }
}