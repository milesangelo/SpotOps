using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("get/{id:int}")]
        public IActionResult GetById(int id)
        {
            var group = _db.Groups
                .FirstOrDefault(grp =>
                    grp.Id == id);
            
            if (group == null)
            {
                return NotFound();
            }

            return Ok(group);
        }

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
                Name = grp.Name,
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now
            };

            _db.Groups.Add(newGroup);
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
                //var groupToDelete = await groupService.GetGroup(id);
                var groupToDelete = _db.Groups.First(grp => grp.Id == id);

                if (groupToDelete == null)
                {
                    return NotFound($"Group with id = {id} was not found.");
                }

                _db.Groups.Remove(groupToDelete);
                _db.SaveChanges();
                
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="group"></param>
        /// <returns></returns>
        [HttpPut("update/{id:int}")]
        public IActionResult Put(int id, [FromBody] Group group)
        {
            try
            {
                var groupToEdit = _db.Groups.First(grp => grp.Id == id);

                if (groupToEdit == null)
                {
                    return NotFound($"Group with id = {id} was not found.");
                }

                groupToEdit.Name = group.Name;
                groupToEdit.DateModified = DateTime.Now;
                
                _db.SaveChanges();
                
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}