using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotOps.Data;

namespace SpotOps.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/spots")]
    public class SpotController : ControllerBase
    {
        /// <summary>
        /// 
        /// </summary>
        private ApplicationDbContext _db;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dbContext"></param>
        public SpotController(ApplicationDbContext dbContext)
        {
            _db = dbContext;
        }

        [HttpGet("/get/{id:int}")]
        public IActionResult GetById(int id)
        {
            return Ok();
        }
    }
}