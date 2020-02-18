using System;
using System.Collections.Generic;
using Repo_Lib.Abstractions;
using DB_Data.Models;
using System.Linq;

namespace DB_Data.Repos
{
    public class PerformerRepo : Repo_Lib.Abstractions.IPerformerRepo<Performers>
    {
        BAMDBContext bdb;

        public PerformerRepo()
        {
            bdb = new BAMDBContext();
        }

        public PerformerRepo(BAMDBContext bdb)
        {
            this.bdb = bdb ?? throw new ArgumentNullException(nameof(bdb));
        }

        public void AddPerformers(Performers performers)
        {
            if (bdb.Performers.Any(e => e.GroupName == performers.GroupName) || performers.GroupName == null)
            {
                Console.WriteLine($"This group name {performers.GroupName} is already in use");
                return;
            }
            else
                bdb.Performers.Add(performers);
            bdb.SaveChanges();
        }

        public IEnumerable<Performers> GetPerformers()
        {
            var query = from e in bdb.Performers
                        select e;

            return query;
        }

        public void ModifyPerformers(Performers performers)
        {
            if (bdb.Performers.Any(e => e.GroupName == performers.GroupName))
            {
                var per = bdb.Performers.FirstOrDefault(e => e.GroupName == performers.GroupName);
                //per.GroupName = performers.GroupName;
                per.GroupPass = (performers.GroupPass != null) ?  performers.GroupPass : per.GroupPass;
                per.PerformanceType =(performers.PerformanceType != null) ? performers.PerformanceType : per.PerformanceType;
                per.HourlyRate = (performers.HourlyRate != 0) ? performers.HourlyRate : per.HourlyRate;
                per.Rating = (performers.Rating != null) ? performers.Rating : per.Rating;
                per.TotalCost = (performers.TotalCost != 0) ? performers.TotalCost : per.TotalCost;
                //per.Tags = performers.Tags;
                bdb.Performers.Update(per);
                bdb.SaveChanges();
            }
            else
            {
                Console.WriteLine($"Account with username {performers.GroupName} does not exist, please ensure credentials have been typed correctly");
            }
        }

        public void RemovePerformers(string name)
        {
            var per = bdb.Performers.FirstOrDefault(e => e.GroupName == name);
            if (per.GroupName == name)
            {
                bdb.Remove(per);
                bdb.SaveChanges();
            }
            else
            {
                Console.WriteLine($"Group with name {name} was never made");
                return;
            }
        }
    }
}
