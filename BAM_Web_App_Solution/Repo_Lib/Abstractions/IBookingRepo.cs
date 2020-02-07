using System;
using System.Collections.Generic;
using System.Text;

namespace Repo_Lib.Abstractions
{
    
        public interface IBookingRepo<T>
        {
            IEnumerable<T> GetBookings();
            void AddBookings(T bookings);
            void ModifyBookings(T bookings);
            void RemoveBookings(int id);
        }
    
}
