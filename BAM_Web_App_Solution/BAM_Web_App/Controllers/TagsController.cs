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
    public class TagsController : ControllerBase
    {
        private readonly ITagRepo<Tags> _tags;

        public TagsController(ITagRepo<Tags> tags)
        {
            _tags = tags;
        }

        [HttpGet]
        public IEnumerable<Tags> GetTags()
        {
            return _tags.GetTags();
        }

        [HttpGet("{TagId}", Name = "Get")]
        public IActionResult GetTags(int id)
        {
            var tag = _tags.GetTags().FirstOrDefault(x => x.TagId == id);
            if (tag != null)
            {
                return Ok(tag);
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult PostTags([FromBody, Bind("TagId, Tag, GroupName")] Tags tag)
        {
            _tags.AddTags(tag);

            return CreatedAtAction("Get", new { Id = tag.TagId }, tag);
        }

        [HttpPut("{TagId}")]
        public IActionResult PutTags(int tagId, [FromBody] Tags tag)
        {
            if (_tags.GetTags().Any(x => x.TagId == tagId))
            {
                _tags.ModifyTags(tag);
                return NoContent();
            }
            return NotFound();
        }

    }
}