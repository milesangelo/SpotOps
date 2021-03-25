using System.Collections.Generic;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Options;
using SpotOps.Data;
using SpotOps.Models;

namespace SpotOps.Tests
{
    public class FakeSpotOpsDbContext : DbContext
    {
        private Dictionary<int, Spot> _database;

        public FakeSpotOpsDbContext()
        {
            
            _database = new Dictionary<int, Spot>();
        }

      
    }
}