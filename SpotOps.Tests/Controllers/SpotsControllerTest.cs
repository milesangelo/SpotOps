using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shouldly;
using SpotOps.Controllers;
using SpotOps.Data;
using SpotOps.Models;
using SpotOps.ResponseModels;
using SpotOps.Services;
using Xunit;

namespace SpotOps.Tests.Controllers
{
    public class SpotsControllerTest
    {
        private DbContextOptions<ApplicationDbContext> _options;
        
        public SpotsControllerTest()
        {
            _options = new MockDbContextOptions().CreateNewContextOptions();
        }

        [Fact]
        public void GetById_When_CalledWithValidId_Should_ReturnOkObjectResult()
        {
            // Arrange
            Seed();

            using (var context = new ApplicationDbContext(_options, new OperationalStoreOptionsMigrations()))
            {
                var spotService = new SpotResponseService(
                    new MockHttpContextAccessor().GetDefaultMock().Object,
                    new SpotService(context),
                    new SpotImageService(context),
                    new UserService(context));
                var spotController = new SpotsController(spotService);
                
                // Act
                var actionResult = spotController.GetById(1);
                
                // Assert
                actionResult.ShouldNotBe(null);
                actionResult.Result.ShouldBeOfType(typeof(OkObjectResult));
            }
        }

        [Fact]
        public void GetById_When_CalledWithValidId_Should_ReturnSpotResponse()
        {
            // Arrange
            Seed();

            using (var context = new ApplicationDbContext(_options, new OperationalStoreOptionsMigrations()))
            {
                var spotController = new SpotsController(
                    new SpotResponseService(
                        new MockHttpContextAccessor().GetDefaultMock().Object,
                        new SpotService(context),
                        new SpotImageService(context),
                        new UserService(context))
                    );

                // Act
                var okResult = spotController.GetById(1).Result as OkObjectResult;
                var spotResponse = okResult.Value;
                
                // Assert
                Assert.IsType<SpotResponse>(spotResponse);
            }
        }

        /// <summary>
        /// Fills the mock database with two spots and two spot images.
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
                    Guid = Guid.NewGuid().ToString(),
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
                    Guid = Guid.NewGuid().ToString(),
                    ImageType = ".jpeg",
                    Spot = spot2.Entity
                });
                
                context.SaveChanges();
            }
        }

        // [Fact]
        // public async void Get_WhenCalled_ShouldReturnOkResult()
        // {
        //     // Act
        //     var actionResult = await _controller.Get();
        //     
        //     // Assert
        //     Assert.IsType<OkObjectResult>(actionResult.Result);
        // }

        // [Fact]
        // public async void Get_WhenCalled_ShouldReturnAllSpotResponses()
        // {
        //     var mock = new Mock<ISpotService>();
        //     
        //     mock.Setup(e => e.GetById(1)).Returns(new Spot
        //     {
        //         Name = "Test 1",
        //         Type = "Park"
        //     });
        //     
        //     SpotsController spotsController = new SpotsController(mock.Object);
        //     
        //     var actionResult = await spotsController.GetById(1).Result;
        //     var okResult = actionResult as OkObjectResult;
        //     
        //     var result = taskResult;
        //     
        //     Assert.Equal("Test 1", )
        //     
        //     
        //     //Arrange
        //     CreateTestData();
        //     
        //     // Act
        //     var actionResult = await _controller.Get();
        //     var okResult = actionResult.Result as OkObjectResult;
        //     var objectValue = okResult.Value;
        //     var spotResponses = (ICollection<SpotResponse>) objectValue;
        //     // var spotResponses = okResult
        //     
        //     // Assert
        //     Assert.IsAssignableFrom<ICollection<SpotResponse>>(spotResponses);
        //     Assert.Equal(2, spotResponses.Count);
        // }
        
    }
}
