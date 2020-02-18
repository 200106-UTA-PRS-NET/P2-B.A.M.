using DB_Data.Models;
using Microsoft.AspNetCore.Mvc;
using Repo_Lib.Abstractions;
using System.Collections.Generic;
using System.Linq;

namespace BAM_Web_App.Controllers
{
    [Route("BAMAPI/[controller]")]
    public class VenueController : ControllerBase
    {
        private readonly IClientRepo<DB_Data.Models.Clients> _repository;
        public VenueController(IClientRepo<DB_Data.Models.Clients> repo)
        {
            _repository = repo;
        }

        //Obtains a list of all Clients (Venues)
        [HttpGet]
        //public ActionResult Get()
        public IEnumerable<Clients> Get()
        {
           return _repository.GetClients();
        }

        //Obtains a specific client. Not used for logging in.
        [HttpGet("{ClientName}", Name = "GetVenues")]
        public ActionResult GetVenues(string ClientName)
        {
            var getClients = _repository.GetClients();
            var certainClient = getClients.FirstOrDefault<Clients>(x => x.ClientName == ClientName);
            if (certainClient != null)
                return Ok(certainClient);
            else
                return NotFound();
        }

        //Obtains a specific client by logging in.
        [HttpGet("{ClientName}/{ClientPass}", Name = "LogInVenues")]
        public ActionResult LogInVenues(string ClientName, string ClientPass)
        {
            var getClients = _repository.GetClients();
            var certainClient = getClients.FirstOrDefault<Clients>(x => x.ClientName == ClientName && x.ClientPass == ClientPass);
            if (certainClient != null)
                return Ok(certainClient);
            else
                return NotFound();
        }

        [HttpPost]
        public ActionResult PostVenues([FromBody, Bind("ClientName", "Location", "ClientPass")]Clients client)
        { 
            _repository.AddClients(client);
            return CreatedAtRoute("GetVenues", new {Name = client.ClientName }, client);
        }

        [HttpPut("{ClientName}")]
        public IActionResult PutVenues(string ClientName, [FromBody]Clients client)
        {
            var getClients = _repository.GetClients();
            var certainClient = getClients.FirstOrDefault<Clients>(x => x.ClientName == ClientName);
            if (certainClient != null)
            {
                Clients oldC = new Clients()
                {
                    Location = client.Location
                };
                oldC.ClientName = certainClient.ClientName;
                oldC.ClientPass = certainClient.ClientPass;
                _repository.ModifyClients(oldC);
                return NoContent();
            }
            return NotFound();


        }

    }
}