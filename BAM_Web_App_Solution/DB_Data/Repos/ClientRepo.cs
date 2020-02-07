using System;
using System.Collections.Generic;
using System.Text;
using Repo_Lib.Abstractions;
using DB_Data.Models;
using System.Linq;

namespace DB_Data.Repos
{
    public class ClientRepo : Repo_Lib.Abstractions.IClientRepo<Clients>
    {
        BAMDBContext bdb;

        public ClientRepo()
        {
            bdb = new BAMDBContext();
        }

        public ClientRepo(BAMDBContext bdb)
        {
            this.bdb = bdb ?? throw new ArgumentNullException(nameof(bdb));
        }

        public void AddClients(Clients clients)
        {
            if (bdb.Clients.Any(e => e.ClientName == clients.ClientName) || clients.ClientName == null)
            {
                Console.WriteLine($"This location name {clients.ClientName} is already in use");
                return;
            }
            else
                bdb.Clients.Add(clients);
            bdb.SaveChanges();
        }

        public IEnumerable<Clients> GetClients()
        {
            var query = from e in bdb.Clients
                        select e;

            return query;
        }

        public void ModifyClients(Clients clients)
        {
            if (bdb.Clients.Any(e => e.ClientName == clients.ClientName))
            {
                var cli = bdb.Clients.FirstOrDefault(e => e.ClientName == clients.ClientName);
                cli.ClientName = clients.ClientName;
                cli.ClientPass = clients.ClientPass;
                cli.Location = clients.Location;

                bdb.Clients.Update(cli);
                bdb.SaveChanges();
            }
            else
            {
                Console.WriteLine($"Venue with name {clients.ClientName} does not exist, please ensure credentials have been typed correctly");
            }
        }

        public void RemoveClients(string name)
        {
            var cli = bdb.Clients.FirstOrDefault(e => e.ClientName == name);
            if (cli.ClientName == name)
            {
                bdb.Remove(cli);
                bdb.SaveChanges();
            }
            else
            {
                Console.WriteLine($"Client with name {name} was never made");
                return;
            }
        }
    }
}
