using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SpotOps.Data;
using SpotOps.Models;

namespace SpotOps.Services
{
    public class FakeSpotService 
    {
        private ApplicationDbContext _context;
        
        public FakeSpotService(ApplicationDbContext context)
        {
            _context = context;
        }

        public int Add(Spot spot)
        {
            throw new NotImplementedException();
        }

        public Task<Spot> GetById(int i)
        {
            throw new NotImplementedException();
        }
    }
}