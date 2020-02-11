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
        //TODO: add exception handler.

        //Obtains a list of all Clients (Venues)
        [HttpGet]
        public IEnumerable<Clients> Get()
        {
            var getClients = _repository.GetClients();
            return getClients;
        }

        //Obtains a specific client. Not used for logging in.
        [HttpGet("{ClientName}", Name = "Get")]
        public ActionResult Get(string ClientName)
        {
            var getClients = _repository.GetClients();
            var certainClient = getClients.FirstOrDefault<Clients>(x => x.ClientName == ClientName);
            if (certainClient != null)
                return Ok(certainClient);
            else
                return NotFound();
        }

        //TODO: Add an additional Get for logging in as a client.

        [HttpPost]
        public ActionResult Post([FromBody, Bind("ClientName", "Location", "ClientPass")]Clients client)
        {
            var getClients = _repository.GetClients();
            var certainClient = getClients.FirstOrDefault<Clients>(x => x.ClientName == client.ClientName);
            if (certainClient != null)
                return BadRequest();
            else
            {
                _repository.AddClients(client);
                return CreatedAtRoute("Get", new { ClientName = client.ClientName }, client);
            }
        }

        //TODO: Check to see if this properly changes database.
        [HttpPut("{ClientName}")]
        public IActionResult Put(string ClientName, [FromBody]Clients client)
        {
            var getClients = _repository.GetClients();
            if (getClients.FirstOrDefault<Clients>(x => x.ClientName == client.ClientName) is Clients previousClient)
            {
                previousClient.ClientName = client.ClientName;
                previousClient.ClientPass = client.ClientPass;
                previousClient.Location = client.Location;
                return NoContent();
            }
            return NotFound();


        }

    }
}