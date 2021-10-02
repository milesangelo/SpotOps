using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SpotOps.Data;
using SpotOps.Models;
using SpotOps.ResponseModels;
using SpotOps.Services;
using Xunit;
using Shouldly;

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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private SpotResponseService CreateNewSpotResponseObject(ApplicationDbContext context)
        {
            return new SpotResponseService(new MockHttpContextAccessor().GetDefaultMock().Object, 
                new SpotService(context),
                new SpotImageService(context), 
                new UserService(context));
        }
        
        /// <summary>
        /// 
        /// </summary>
        [Fact]
        public async void GetAll_When_CalledWithExistingData_Should_ReturnAllSpotResponses()
        {
            // Arrange
            Seed();
            
            // Act - use a clean instance of the context to run the test
            using (var context = new ApplicationDbContext(_options, new OperationalStoreOptionsMigrations()))
            {
                // Arrange
                var spotService = new SpotResponseService(new MockHttpContextAccessor().GetDefaultMock().Object, new SpotService(context),
                    new SpotImageService(context), new UserService(context));
                
                // Act
                ICollection<SpotResponse> spots = await spotService.GetAll();
                
                // Assert
                Assert.Equal(2, spots.Count);
            }
        }
        
        /// <summary>
        /// 
        /// </summary>
        [Fact]
        public async void GetById_When_CalledWithValidId_Should_ReturnSpotWithMatchingId()
        {
            using (var context = new ApplicationDbContext(_options, new OperationalStoreOptionsMigrations()))
            {
                // Arrange
                Seed();
                int idToFind = 1;
                var spotResponseService = CreateNewSpotResponseObject(context);

                // Act
                SpotResponse spot = await spotResponseService.GetById(idToFind);
                
                // Assert
                Assert.Equal(idToFind, spot.Id);
            }
        }
        
        /// <summary>
        /// 
        /// </summary>
        [Fact]
        public async void AddSpot_When_CalledWithSpotResponse_Should_ReturnSpotResponse()
        {
            // Seed a user into the database.
            using (var context = new ApplicationDbContext(_options, new OperationalStoreOptionsMigrations()))
            {
                context.Users.Add(new ApplicationUser()
                {
                    Id = "test_name_identifier",
                    Name = "test_name"
                });

                context.SaveChanges();
            }
            
            FormFile file;
            using (var context = new ApplicationDbContext(_options, new OperationalStoreOptionsMigrations()))
            {
                // Create a FormFile object for testing.
                var stream = File.OpenRead(Path.Combine(Directory.GetCurrentDirectory(), "../../../test.jpg"));
                file = new FormFile(stream, 0, stream.Length, null, Path.GetFileName(stream.Name))
                {
                    Headers = new HeaderDictionary(),
                    ContentType = "image/jpg"
                };
                
                // Arrange
                var spotResponse = new SpotResponse()
                {
                    Name = "test",
                    Type = "Trail",
                    DateCreated = DateTime.Now,
                    FileImageSrc = string.Empty,
                    FileName = file.FileName,
                    FormFile = file
                };

                var spotService = CreateNewSpotResponseObject(context);

                // Act
                 var addedSpotResponse = await spotService.Add(spotResponse);

                // Assert
                addedSpotResponse.Id.ShouldBeGreaterThan(0);
                addedSpotResponse.Name.ShouldMatch(spotResponse.Name);
                addedSpotResponse.Type.ShouldMatch(spotResponse.Type);
                addedSpotResponse.DateCreated.ShouldBe(spotResponse.DateCreated);
                addedSpotResponse.FileName.ShouldBe(spotResponse.FileName);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        [Fact]
        public async void Delete_When_CalledWithId_Should_ReturnTrueAndRemoveSpot()
        {
            // Arrange
            Seed();
            
            // Act
            var context = new ApplicationDbContext(_options, new OperationalStoreOptionsMigrations());
            var spotService = CreateNewSpotResponseObject(context);

            int idToDelete = 1;
            
            // call remove on the service.
            var result = await spotService.Remove(idToDelete);

            var spot = await spotService.GetById(idToDelete);
            
            // Assert
            result.ShouldBe(true);
            spot.ShouldBeNull();
        }

        /// <summary>
        /// 
        /// </summary>
        [Fact]
        public async void Delete_When_CalledWithInvalidId_Should_ReturnFalse()
        {
            // Arrange
            Seed();
            
            using (var context = new ApplicationDbContext(_options, new OperationalStoreOptionsMigrations()))
            {
                var spotService = CreateNewSpotResponseObject(context);
            
                // Act
                int idToDelete = 99;
                var result = await spotService.Remove(idToDelete);
            
                // Assert
                result.ShouldBe(false);
            }
        }

        /// <summary>
        /// 
        /// </summary>
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
        
        /// <summary>
        /// 
        /// </summary>
        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}