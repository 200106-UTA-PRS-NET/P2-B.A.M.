using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repo_Lib.Abstractions;
using DB_Data.Models;


namespace BAM_Web_App.Controllers
{
    [Route("BAMAPI/[controller]")]
    [ApiController]
    public class PerformersController : ControllerBase
    {
        private readonly IPerformerRepo<Performers> _performerRepo;

        public PerformersController(IPerformerRepo<Performers> performerRepo)
        {
            _performerRepo = performerRepo;
        }

        [HttpGet]
        public IEnumerable<Performers> GetPerformers()
        {
            return _performerRepo.GetPerformers();
        }

        [HttpGet("{groupName}", Name = "GetPerformers")]
        public IActionResult GetPerformers(string groupName)
        {
            var performer = _performerRepo.GetPerformers().FirstOrDefault(x => x.GroupName == groupName);
            if (performer != null)
                return Ok(performer);
            else
                return NotFound();
        }

        [HttpGet("{groupName}/{groupPass}", Name = "SignIn")]
        public IActionResult GetPerformers(string groupName, string groupPass)
        {
            var performer = _performerRepo.GetPerformers().FirstOrDefault(x => x.GroupName == groupName && x.GroupName == groupPass);
            if (performer != null)
                return Ok(performer);
            else
                return NotFound();
        }

        [HttpPost]
        public IActionResult PostPerformers([FromBody, Bind("GroupName, PerformanceType, HourlyRate, Rating, GroupPass")] Performers performer)
        {
            _performerRepo.AddPerformers(performer);

            return CreatedAtRoute("GetPerformers", new { GroupName = performer.GroupName }, performer);
        }

        [HttpPut("{groupName}")]
        public IActionResult PutPerformers(string GroupName, [FromBody]Performers performer)
        {
            if (_performerRepo.GetPerformers().Any(x => x.GroupName == GroupName))
            {
                _performerRepo.ModifyPerformers(performer);
                return NoContent();
            }
            return NotFound();
        }
    }

}