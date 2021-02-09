using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotOps.Data;
using SpotOps.Models;
using SpotOps.ResponseModels;

namespace SpotOps.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/spots")]
    public class SpotsController : ControllerBase
    {
        /// <summary>
        /// 
        /// </summary>
        private ApplicationDbContext _db;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dbContext"></param>
        public SpotsController(ApplicationDbContext dbContext)
        {
            _db = dbContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("get/{id:int}")]
        public IActionResult GetById(int id)
        {
            return Ok();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("get")]
        public IActionResult Get()
        {
            var spots = _db.Spots.Select(spot => spot);
            return Ok(spots);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="spot"></param>
        /// <returns></returns>
        [HttpPost("post")]
        public IActionResult Post([FromBody] SpotResponse spot)
        {
            var newSpot = new Spot
            {
                Name = spot.Name,
                DateCreated = DateTime.Now
            };

            _db.Spots.Add(newSpot);
            _db.SaveChanges();
            return Ok();
        }
    }
}