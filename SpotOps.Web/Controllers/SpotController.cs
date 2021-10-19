using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpotOps.Web.Data;

namespace SpotOps.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpotController : ControllerBase
    {
        private readonly SpotOpsDbContext _context;

        public SpotController(SpotOpsDbContext context)
        {
            _context = context;
        }
        
        /// <summary>
        /// Get: api/Spot
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Spot/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Spot
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Spot/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Spot/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
