using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using SpotOps.Models;

namespace SpotOps.Services
{
    public interface ISpotService
    {
        Task<Spot> GetById(int id);
        Task<List<Spot>> GetAll();
        Task AddAsync(Spot newSpot);
        Task Remove(int id);
    }
}