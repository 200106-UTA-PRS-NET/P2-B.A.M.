using System;
using System.Collections.Generic;

namespace DB_Data.Models
{
    public partial class Bookings
    {
        public int BookingId { get; set; }
        public string GroupName { get; set; }
        public string TimeFrame { get; set; }
        public string BookingStatus { get; set; }
        public string ClientName { get; set; }
        public string Location { get; set; }
        public string Review { get; set; }
        public int? Score { get; set; }

        public virtual Clients ClientNameNavigation { get; set; }
        public virtual Performers GroupNameNavigation { get; set; }
    }
}
