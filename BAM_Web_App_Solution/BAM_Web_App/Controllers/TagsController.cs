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

        [HttpGet("{tagId}", Name = "GetTags")]
        public IActionResult GetTags(int tagId)
        {
            var tag = _tags.GetTags().FirstOrDefault(x => x.TagId == tagId);
            if (tag != null)
            {
                return Ok(tag);
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult PostTags([FromBody, Bind("Tag, GroupName")] Tags tag)
        {
            var getTags = _tags.GetTags();

            int newid = getTags.Max(x => x.TagId) + 1;
            tag.TagId = newid;
            _tags.AddTags(tag);

            return CreatedAtAction("Get", new { Id = newid }, tag);
        }

        [HttpPut("{tagId}")]
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