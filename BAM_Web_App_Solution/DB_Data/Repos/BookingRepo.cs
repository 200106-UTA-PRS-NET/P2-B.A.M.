using System;
using System.Collections.Generic;
using System.Text;
using Repo_Lib.Abstractions;
using DB_Data.Models;
using System.Linq;

namespace DB_Data.Repos
{
    public class BookingRepo : Repo_Lib.Abstractions.IBookingRepo<Bookings>
    {
        BAMDBContext bdb;

        public BookingRepo()
        {
            bdb = new BAMDBContext();
        }

        public BookingRepo(BAMDBContext bdb)
        {
            this.bdb = bdb ?? throw new ArgumentNullException(nameof(bdb));
        }

        public void AddBookings(Bookings bookings)
        {
            if (bdb.Bookings.Any(e => e.BookingId == bookings.BookingId) || bookings.BookingId == null)
            {
                Console.WriteLine($"This booking {bookings.BookingId} has already been made");
                return;
            }
            else
                bdb.Bookings.Add(bookings);
            bdb.SaveChanges();

        }

        public IEnumerable<Bookings> GetBookings()
        {
            var query = from e in bdb.Bookings
                        select e;

            return query;
        }

        public void ModifyBookings(Bookings bookings)
        {
            if (bdb.Bookings.Any(e => e.BookingId == bookings.BookingId))
            {
                var boo = bdb.Bookings.FirstOrDefault(e => e.BookingId == bookings.BookingId);
                boo.BookingId = bookings.BookingId;
                boo.GroupName = bookings.GroupName;
                boo.TimeFrame = bookings.TimeFrame;
                boo.BookingStatus = bookings.BookingStatus;
                boo.ClientName = bookings.ClientName;
                boo.Location = bookings.Location;
                boo.Review = bookings.Review;
                boo.Score = bookings.Score;
                bdb.Bookings.Update(boo);
                bdb.SaveChanges();
            }
            else
            {
                Console.WriteLine($"Venue with name {bookings.BookingId} does not exist, please ensure credentials have been typed correctly");
            }
        }

        public void RemoveBookings(int id)
        {
            var boo = bdb.Bookings.FirstOrDefault(e => e.BookingId == id);
            if (boo.BookingId == id)
            {
                bdb.Remove(boo);
                bdb.SaveChanges();
            }
            else
            {
                Console.WriteLine($"Booking with id {id} was never made");
                return;
            }
        }
    }
}
