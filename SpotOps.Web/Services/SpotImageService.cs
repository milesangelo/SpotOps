using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SpotOps.Data;
using SpotOps.Models;

namespace SpotOps.Services
{
    public class SpotImageService : ISpotImageService
    {
        private readonly ApplicationDbContext _context;

        public SpotImageService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<SpotImage> GetBySpotId(int spotId)
        {
            return await _context.SpotImages
                .FirstOrDefaultAsync(img => img.Spot.Id == spotId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="spotImage"></param>
        public async Task AddAsync(SpotImage spotImage)
        {
            await _context.AddAsync(spotImage);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="spotId"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task<int> Remove(int spotId)
        {
            throw new System.NotImplementedException();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public async Task<List<SpotImage>> GetAll()
        {
            return await _context.SpotImages.ToListAsync();
        }
    }
}