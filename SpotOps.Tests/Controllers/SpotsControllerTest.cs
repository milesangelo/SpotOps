using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
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
            _options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "SpotOpsDatabase")
                .Options;
        }

        [Fact]
        public void GetById_When_CalledWithValidId_Should_ReturnOkObjectResult()
        {
            // Arrange
            Seed(_options);

            using (var context = new ApplicationDbContext(_options, new OperationalStoreOptionsMigrations()))
            {
                var mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
                var httpContext = new DefaultHttpContext();
                mockHttpContextAccessor.Setup(_ => _.HttpContext).Returns(httpContext);

                var spotService = new SpotResponseService(context, mockHttpContextAccessor.Object);
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
            Seed(_options);

            using (var context = new ApplicationDbContext(_options, new OperationalStoreOptionsMigrations()))
            {
                var mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
                var httpContext = new DefaultHttpContext();

                mockHttpContextAccessor.Setup(_ => _.HttpContext).Returns(httpContext);
                
                var spotController = new SpotsController(new SpotResponseService(context, mockHttpContextAccessor.Object));

                // Act
                var okResult = spotController.GetById(1).Result as OkObjectResult;
                var spotResponse = okResult.Value;
                
                // Assert
                Assert.IsType<SpotResponse>(spotResponse);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dbContextOptions"></param>
        private void Seed(DbContextOptions<ApplicationDbContext> dbContextOptions)
        {
            using (var context = new ApplicationDbContext(dbContextOptions,  new OperationalStoreOptionsMigrations()))
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

        // private void CreateTestData()
        // {
        //     using (var context = new ApplicationDbContext(_options,  new OperationalStoreOptionsMigrations()))
        //     {
        //         context.Spots.Add(new Spot
        //         {
        //             Name = "Denver Skatepark",
        //             Type = "Park"
        //         });
        //
        //         context.Spots.Add(new Spot
        //         {
        //             Name = "Colfax Sub-box",
        //             Type = "Street"
        //         });
        //         
        //         context.SaveChanges();
        //     }
        //}
    }
}