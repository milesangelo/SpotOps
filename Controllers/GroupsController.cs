using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SpotOps.Data;
using SpotOps.Models;
using SpotOps.ResponseModels;

namespace SpotOps.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/groups")]
    public class GroupsController : ControllerBase
    {
        /// <summary>
        /// 
        /// </summary>
        private ApplicationDbContext _db;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="db"></param>
        public GroupsController(ApplicationDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("get")]
        public List<Group> Get()
        {
            var groups = _db.Groups
                .ToList();

            return groups;
        }

        // /// <summary>
        // /// 
        // /// </summary>
        // /// <returns></returns>
        // [HttpGet("get/{id}")]
        // public Group GetById(int id)
        // {
        //     var group = _db.Groups
        //         .FirstOrDefault(grp =>
        //             grp.Id == id);
        //
        //     return group;
        // }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="grp"></param>
        /// <returns></returns>
        [HttpPost("post")]
        public IActionResult Post([FromBody] GroupResponse grp)
        {
            var newGroup = new Group
            {
                Name = grp.Name
            };

            _db.Groups.Add(newGroup);
            _db.SaveChanges();
            return Ok();
        }
    }
}