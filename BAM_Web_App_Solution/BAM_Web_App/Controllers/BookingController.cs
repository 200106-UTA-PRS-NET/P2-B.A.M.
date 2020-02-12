using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Repo_Lib.Abstractions;
using DB_Data.Models;
using DB_Data.Repos;

namespace BAM_Web_App.Controllers
{
    [Route("BAMAPI/[controller]")]
    public class BookingController : Controller
    {
        private readonly IBookingRepo<DB_Data.Models.Bookings> _repository;

        public BookingController(IBookingRepo<DB_Data.Models.Bookings> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetBookings()
        //public IActionResult Get()
        {
            var getBookings = _repository.GetBookings();
            return Ok(getBookings);
        }

        [HttpGet("{id}", Name = "GetBookings")]
        public IActionResult GetBookings(int id)
        {
            var getBookings = _repository.GetBookings();
            var certainBooking = getBookings.FirstOrDefault<Bookings>(x => x.BookingId == id);
            if (getBookings != null)
             return Ok(certainBooking); 
               
            else
                return NotFound();
        }

        [HttpPost]
        public IActionResult PostBookings([FromBody, Bind("GroupName,TimeFrame,BookingStatus,ClientName,Location,Review,Score")]Bookings bookings)
        {          
            // the client can't set the ID
            var getBookings = _repository.GetBookings();

            int newid = getBookings.Max(x => x.BookingId) + 1;
            bookings.BookingId = newid;
            _repository.AddBookings(bookings);
            return CreatedAtRoute("GetBookings", new { Id = newid }, bookings);
        }

        [HttpPut("{id}")]
        public IActionResult PutBookings(int id, [FromBody] Bookings bookings)
        {
            var getBookings = _repository.GetBookings();
            if (getBookings.FirstOrDefault<Bookings>(x => x.BookingId == id) is Bookings oldBooking)
            {
                oldBooking.GroupName = bookings.GroupName;
                oldBooking.TimeFrame = bookings.TimeFrame;
                oldBooking.BookingStatus = bookings.BookingStatus;
                oldBooking.ClientName = bookings.ClientName;
                oldBooking.Location = bookings.Location;
                oldBooking.Review = bookings.Review;
                oldBooking.Score = bookings.Score;
                return NoContent();// 204 success, no body
            }
            // not found (404)
            return NotFound();
        }
    }
}