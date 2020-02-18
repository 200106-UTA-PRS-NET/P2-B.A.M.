using System.Collections.Generic;

namespace DB_Data.Models
{
    public partial class Clients
    {
        public Clients()
        {
            Bookings = new HashSet<Bookings>();
        }

        public string ClientName { get; set; }
        public string Location { get; set; }
        public string ClientPass { get; set; }

        public virtual ICollection<Bookings> Bookings { get; set; }
    }
}
