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
    [Route("api/[controller]")]
    [ApiController]
    public class PerformersController : ControllerBase
    {
        private readonly IPerformerRepo<Performers> _performerRepo;

        public PerformersController(IPerformerRepo<Performers> performerRepo)
        {
            _performerRepo = performerRepo;
        }

        [HttpGet]
        public IEnumerable<Performers> Get()
        {
            return _performerRepo.GetPerformers();
        }

        [HttpGet("{GroupName}", Name = "Get")]
        public IActionResult Get(string name)
        {
            var performer = _performerRepo.GetPerformers().FirstOrDefault(x => x.GroupName == name);
            if (performer != null)
                return Ok(performer);
            else
                return NotFound();
        }

        [HttpPost]
        public IActionResult Post([FromBody, Bind("GroupName, PerformanceType, HourlyRate, Rating, GroupPass")] Performers performer)
        {
            _performerRepo.AddPerformers(performer);

            return CreatedAtRoute("Get", new { Name = performer.GroupName }, performer);
        }

        [HttpPut("{GroupName}")]
        public IActionResult Put(string GroupName, [FromBody]Performers performer)
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