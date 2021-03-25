using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SpotOps.Data;
using SpotOps.Models;
using SpotOps.ResponseModels;
using SpotOps.Services;
using Xunit;

namespace SpotOps.Tests.Services
{
    public class SpotResponseServiceTests : IDisposable
    {
        private DbContextOptions<ApplicationDbContext> _options;
        
        /// <summary>
        /// 
        /// </summary>
        public SpotResponseServiceTests()
        {
            _options = new MockDbContextOptions().CreateNewContextOptions();
        }

        [Fact]
        public void GetAll_When_CalledWithExistingData_Should_ReturnAllSpots()
        {
            // Arrange
            Seed();
            
            // Act - use a clean instance of the context to run the test
            using (var context = new ApplicationDbContext(_options, new OperationalStoreOptionsMigrations()))
            {
                // Arrange
                var spotService = new SpotResponseService(context, new MockHttpContextAccessor().GetDefaultMock().Object);
                
                // Act
                ICollection<SpotResponse> spots = spotService.GetAll();
                
                // Assert
                Assert.Equal(2, spots.Count);
            }
        }

        private void Seed()
        {
            using (var context = new ApplicationDbContext(_options,  new OperationalStoreOptionsMigrations()))
            {
                var spot1 = context.Spots.Add(new Spot
                {
                    Name = "Denver Skatepark",
                    Type = "Park"
                });

                context.SpotImages.Add(new SpotImage()
                {
                    FileName = "test1.jpg",
                    Guid = new Guid().ToString(),
                    ImageType = ".jpg",
                    Spot = spot1.Entity
                });
                
                var spot2 = context.Spots.Add(new Spot
                {
                    Name = "Colfax Sub-box",
                    Type = "Street"
                });

                context.SpotImages.Add(new SpotImage()
                {
                    FileName = "test2.jpeg",
                    Guid = new Guid().ToString(),
                    ImageType = ".jpeg",
                    Spot = spot2.Entity
                });
                
                context.SaveChanges();
            }
        }

        [Fact]
        public async void GetSpotById_ShouldReturnSpotWithId()
        {
            using (var context = new ApplicationDbContext(_options, new OperationalStoreOptionsMigrations()))
            {
                // Arrange
                Seed();
                
                int idToFind = 1;
                
                var spotService = new SpotResponseService(context, new MockHttpContextAccessor().GetDefaultMock().Object);

                // Act
                SpotResponse spot = await spotService.GetById(idToFind);
                
                // Assert
                Assert.Equal(idToFind, spot.Id);
                
            }
        }
        
        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}