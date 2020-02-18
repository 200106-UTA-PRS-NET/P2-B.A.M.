using System;
using System.Collections.Generic;
using System.Text;

namespace Repo_Lib.Abstractions
{
    
        public interface IBookingRepo<T>
        {
            IEnumerable<T> GetBookings();
            IEnumerable<T> GetGroupBookings(string groupname);
        IEnumerable<T> GetGroupBookingsByStatus(string groupname, string status);
        IEnumerable<T> GetClientBookings(string clientname);

            void AddBookings(T bookings);
            void ModifyBookings(T bookings);
            void RemoveBookings(int id);
        }
    
}
