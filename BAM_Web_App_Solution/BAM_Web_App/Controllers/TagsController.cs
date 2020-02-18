using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpGet("ByName/{groupName}", Name ="GetGroupTags")]
        public IEnumerable<Tags> GetGroupTags(string groupName)
        {
            return _tags.GetGroupTags(groupName);
        }

        [HttpPost]
        public IActionResult PostTags([FromBody, Bind("Tag, GroupName")] Tags tag)
        {
            _tags.AddTags(tag);
            var getTags = _tags.GetTags().FirstOrDefault(x => x.GroupName == tag.GroupName && x.Tag == tag.Tag);
            if (getTags != null)
                return CreatedAtAction("GetTags", new { Id = getTags.TagId }, tag);
            else
                return NotFound();
        }

        [HttpDelete("{tagId}")]
        public IActionResult Delete(int tagId)
        {
            if (_tags.GetTags().Any(x => x.TagId == tagId))
            {
                _tags.RemoveTags(tagId);
                return NoContent();
            }
            return NotFound();
        }
    }
}