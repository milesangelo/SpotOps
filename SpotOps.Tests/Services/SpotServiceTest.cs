using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Moq;
using SpotOps.Data;
using SpotOps.Models;
using SpotOps.ResponseModels;
using SpotOps.Services;
using Xunit;

namespace SpotOps.Tests.Services
{
    public class SpotResponseServiceTests : IDisposable
    {
        private DbContextOptions options;
        
        public SpotResponseServiceTests()
        {
            options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "SpotOpsDatabase")
                .Options;
        }

        [Fact]
        public void GetAllSpots_ShouldReturnAllSpots()
        {
            using (var context = new ApplicationDbContext(options,  new OperationalStoreOptionsMigrations()))
            {
                context.Spots.Add(new Spot
                {
                    Name = "Denver Skatepark",
                    Type = "Park"
                });

                context.Spots.Add(new Spot
                {
                    Name = "Colfax Sub-box",
                    Type = "Street"
                });
                
                context.SaveChanges();
            }
            
            // Act - use a clean instance of the context to run the test
            using (var context = new ApplicationDbContext(options, new OperationalStoreOptionsMigrations()))
            {
                // Arrange
                var mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
                var httpContext = new DefaultHttpContext();

                mockHttpContextAccessor.Setup(_ => _.HttpContext).Returns(httpContext);

                var spotService = new SpotResponseService(context, mockHttpContextAccessor.Object);
                
                // Act
                ICollection<SpotResponse> spots = spotService.GetAll();
                
                // Assert
                Assert.Equal(2, spots.Count);
            }
        }

        [Fact]
        public async void GetSpotById_ShouldReturnSpotWithId()
        {
            using (var context = new ApplicationDbContext(options, new OperationalStoreOptionsMigrations()))
            {
                // Arrange
                int idToFind = 1;
                var mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
                var httpContext = new DefaultHttpContext();

                mockHttpContextAccessor.Setup(_ => _.HttpContext).Returns(httpContext);

                var spotService = new SpotResponseService(context, mockHttpContextAccessor.Object);
                CreateMockSpotData();

                // Act
                SpotResponse spot = await spotService.GetById(idToFind);
                
                // Assert
                Assert.Equal(idToFind, spot.Id);
                
            }
        }

        private void CreateMockSpotData()
        {
            using (var context = new ApplicationDbContext(options,  new OperationalStoreOptionsMigrations()))
            {
                context.Spots.Add(new Spot
                {
                    Name = "Denver Skatepark",
                    Type = "Park"
                });

                context.Spots.Add(new Spot
                {
                    Name = "Colfax Sub-box",
                    Type = "Street"
                });
                
                context.SaveChanges();
            }
        }

        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}