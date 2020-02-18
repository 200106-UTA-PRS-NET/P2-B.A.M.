using System.Collections.Generic;

namespace DB_Data.Models
{
    public partial class Performers
    {
        public Performers()
        {
            Bookings = new HashSet<Bookings>();
            Tags = new HashSet<Tags>();
        }

        public string GroupName { get; set; }
        public string PerformanceType { get; set; }
        public decimal HourlyRate { get; set; }
        public string Rating { get; set; }
        public string GroupPass { get; set; }
        public decimal TotalCost { get; set; }

        public virtual ICollection<Bookings> Bookings { get; set; }
        public virtual ICollection<Tags> Tags { get; set; }
    }
}
