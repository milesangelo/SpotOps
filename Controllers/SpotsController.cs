using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
            var spot = _db.Spots
                .FirstOrDefault(spt => spt.Id == id);

            if (spot == null)
            {
                return NotFound();
            }

            return Ok(spot);
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("delete/{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var spotToDelete = _db.Spots.First(spot => spot.Id == id);

                if (spotToDelete == null)
                {
                    return NotFound($"Spot with id = {id} was not found.");
                }

                _db.Spots.Remove(spotToDelete);
                _db.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="spot"></param>
        /// <returns></returns>
        [HttpPut("update/{id:int}")]
        public IActionResult Put(int id, [FromBody] Spot spot)
        {
            try
            {
                var spotToEdit = _db.Spots.First(spot => spot.Id == id);
                
                if (spotToEdit == null)
                {
                    return NotFound($"Spot with id = {id} was not found.");
                }

                spotToEdit.Name = spot.Name;
                //spotToEdit.DateModified = DateTime.Now;
                
                _db.SaveChanges();
                
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}