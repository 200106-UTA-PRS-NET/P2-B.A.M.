using System;
using System.Collections.Generic;
using System.Text;
using Repo_Lib.Abstractions;
using DB_Data.Models;
using System.Linq;

namespace DB_Data.Repos
{
   public class TagRepo : Repo_Lib.Abstractions.ITagRepo<Tags>
    {
        BAMDBContext bdb;

        public TagRepo()
        {
            bdb = new BAMDBContext();
        }

        public TagRepo(BAMDBContext bdb)
        {
            this.bdb = bdb ?? throw new ArgumentNullException(nameof(bdb));
        }

        public void AddTags(Tags tags)
        {
            if (bdb.Tags.Any(e => e.TagId == tags.TagId) || tags.TagId == null)
            {
                Console.WriteLine($"This tag {tags.TagId} is already in use");
                return;
            }
            else
                bdb.Tags.Add(tags);
            bdb.SaveChanges();
        }

        public IEnumerable<Tags> GetTags()
        {
            var query = from e in bdb.Tags
                        select e;

            return query;
        }

        public void ModifyTags(Tags tags)
        {
            if (bdb.Tags.Any(e => e.TagId == tags.TagId))
            {
                var tag = bdb.Tags.FirstOrDefault(e => e.TagId == tags.TagId);
                tag.TagId = tags.TagId;
                tag.Tag = tags.Tag;
                tag.GroupName = tags.GroupName;

                bdb.Tags.Update(tag);
                bdb.SaveChanges();
            }
            else
            {
                Console.WriteLine($"Venue with name {tags.TagId} does not exist, please ensure credentials have been typed correctly");
            }
        }

        public void RemoveTags(int id)
        {
            var tag = bdb.Tags.FirstOrDefault(e => e.TagId == id);
            if (tag.TagId == id)
            {
                bdb.Remove(tag);
                bdb.SaveChanges();
            }
            else
            {
                Console.WriteLine($"Tag with id {id} was never made");
                return;
            }
        }
    }
}
