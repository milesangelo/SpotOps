using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SpotOps.Data;
using SpotOps.Models;

namespace SpotOps.Services
{
    public class SpotService : ISpotService
    {
        /// <summary>
        /// 
        /// </summary>
        private readonly ApplicationDbContext _context;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        public SpotService(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Spot> GetById(int id)
        {
            return await _context.Spots
                .FirstOrDefaultAsync(spt => spt.Id == id);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public async Task<List<Spot>> GetAll()
        {
            return await _context.Spots.ToListAsync();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="newSpot"></param>
        public async Task AddAsync(Spot newSpot)
        {
            await _context.AddAsync(newSpot);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <exception cref="NotImplementedException"></exception>
        public async Task Remove(int id)
        {
            _context.Remove(await GetById(id));
            await _context.SaveChangesAsync();
        }
    }
}