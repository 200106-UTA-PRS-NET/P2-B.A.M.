using System;
using System.Collections.Generic;
using System.Text;
using DB_Data.Models;
using DB_Data.Repos;
using Microsoft.EntityFrameworkCore;

namespace XUnitTests
{
    public class CreateContext
    {
        public static BAMDBContext getNewContext(string n)
        {
            var option = new DbContextOptionsBuilder<BAMDBContext>().UseInMemoryDatabase(databaseName: n).Options;
            var context = new BAMDBContext(option);

            var Venue1 = new Clients()
            {
               ClientName = "Alabama Coffee",
               Location = "Alabama",
               ClientPass = "alabama"
            };

            var Venue2 = new Clients()
            {
                ClientName = "Brad's Bistro",
                Location = "Oregon",
                ClientPass = "burgers"
            };

            var Performer1 = new Performers()
            {
                GroupName = "Zeal Seals",
                GroupPass = "zzzzzz",
                PerformanceType = "Rock",
                Rating = "T",
                HourlyRate = 200,
                TotalCost = 10200,

            };

            var Performer2 = new Performers()
            {
                GroupName = "Young Ones",
                GroupPass = "children",
                PerformanceType = "Mascot",
                Rating = "E",
                HourlyRate = 34,
                TotalCost = 68,
            };

            var Booking1 = new Bookings()
            {
                GroupName = "Young Ones",
                ClientName = "Alabama Coffee",
                Review = "It was a fine performance",
                Score = 4,
                BookingId = 2,
                TimeFrame = "2/27/20",
                Location = "Alabama",
                BookingStatus = "Cancelled"
            };
            var Booking2 = new Bookings()
            {
                GroupName = "Zeal Seals",
                ClientName = "Brad's Bistro",
                Review = "",
                Score = 2,
                BookingId = 3,
                TimeFrame = "6/2/16",
                Location = "Oregon",
                BookingStatus = "Upcoming"
            };
            var Tag1 = new Tags()
            {
                Tag = "Loud",
                TagId = 5,
                GroupName = "Zeal Seals"
            };
            var Tag2 = new Tags()
            {
                Tag = "Fun",
                TagId = 6,
                GroupName = "Zeal Seals"
            };
            context.Add(Booking1);
            context.Add(Booking2);
            context.Add(Tag1);
            context.Add(Tag2);
            context.Add(Venue1);
            context.Add(Venue2);
            context.Add(Performer1);
            context.Add(Performer2);
            return context;
        }
    }
}
