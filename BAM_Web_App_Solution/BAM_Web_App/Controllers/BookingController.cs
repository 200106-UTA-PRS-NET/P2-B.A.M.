using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Repo_Lib.Abstractions;
using DB_Data.Models;

namespace BAM_Web_App.Controllers
{
    [Route("BAMAPI/[controller]")]
    public class BookingController : Controller
    {
        private readonly IBookingRepo<Bookings> _bookingrepo;

        public BookingController(IBookingRepo<Bookings> bookingRepo)
        {
            _bookingrepo = bookingRepo;
        }

        [HttpGet]
        public IEnumerable<Bookings> GetBookings()
        {

            return _bookingrepo.GetBookings();
        }

        [HttpGet("ById/{BookingId}", Name = "GetBookings")]
        public IActionResult GetBookings(int BookingId)
        {
            
            var certainBooking = _bookingrepo.GetBookings().FirstOrDefault<Bookings>(x => x.BookingId == BookingId);
            if (certainBooking != null)
             return Ok(certainBooking); 
               
            else
                return NotFound();
        }


        [HttpGet("ByPerformer/{GroupName}", Name = "GetBookingsBy")]
      //  [Route("Booking/GetBookingsBy")]
        public IEnumerable<Bookings> GetBookingsBy(string GroupName)
        {
            return _bookingrepo.GetGroupBookings(GroupName);
        }


        [HttpGet("ByStatus/{GroupName}/{BookingStatus}", Name = "GetBookingsByStatus")]
        //  [Route("Booking/GetBookingsBy")]
        public IEnumerable<Bookings> GetBookingsByStatus(string GroupName, string BookingStatus)
        {
            return _bookingrepo.GetGroupBookingsByStatus(GroupName, BookingStatus);
        }


        [HttpGet("ByClient/{ClientName}", Name = "GetBookingsCli")]
        //  [Route("Booking/GetBookingsCli")]
        public IEnumerable<Bookings> GetBookingsCli(string ClientName)
        {

            return _bookingrepo.GetClientBookings(ClientName);
        }

        [HttpPost]
        public IActionResult PostBookings([FromBody, Bind("BookingId,GroupName,TimeFrame,BookingStatus,ClientName,Location,Review,Score")]Bookings bookings)
        {
            // the client can't set the ID
            _bookingrepo.AddBookings(bookings);
            return CreatedAtRoute("GetBookings", new { BookingId = bookings.BookingId }, bookings);
        }
 
        [HttpPut("{BookingId}")]
        public IActionResult PutBookings(int BookingId, int Score, [FromBody] Bookings bookings) 
        {
            bookings.BookingId = BookingId;
            if (_bookingrepo.GetBookings().FirstOrDefault<Bookings>(x => x.BookingId == BookingId) is Bookings oldbooking)
            {

                _bookingrepo.ModifyBookings(bookings);
                return NoContent();// 204 success and nothing is in the body
              
            }
            // not found (404)
            return NotFound();
        }
    }
}