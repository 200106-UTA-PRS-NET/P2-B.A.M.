using System;
using Xunit;
using BAM_Web_App.Controllers;
using DB_Data.Repos;
using DB_Data.Models;
using XUnitTests;
using System.Web;
using System.Net;
using System.Collections.Generic;

namespace XUnitTestProject
{
    public class UnitTesting
    {
        private readonly Clients _client = new Clients();
        private readonly Performers _perform = new Performers();
        private readonly Tags _tag = new Tags();
        private readonly Bookings _book = new Bookings();
        
        [Fact]
        public void addClientName()
        {
            string a = "oranges";
            _client.ClientName = a;
            Assert.Equal(a, _client.ClientName);
            //var context = InMemoryDbContextFactory.GetViewzDbContext(dbString);
            //var repo = new ClientRepo();
            //var Vc = new VenueController(repo);
        }
        [Fact]
        public void addClientLocation()
        {
            string a = "Idaho";
            _client.Location = a;
            Assert.Equal(_client.Location, a);
        }
        [Fact]
        public void addClientPassword()
        {
            string a = "password";
            _client.ClientPass = a;
            Assert.Equal(_client.ClientPass, a);
        }

        [Fact]
        public void addTagName()
        {
            string a = "Loud";
            _tag.Tag = a;
            Assert.Equal(_tag.Tag, a);
        }
        [Fact]
        public void addTagId()
        {
            int a = 43;
            _tag.TagId = a;
            Assert.Equal(_tag.TagId, a);
        }
        [Fact]
        public void addTagPerformer()
        {
            string a = "Orange";
            _tag.GroupName = a;
            Assert.Equal(_tag.GroupName, a);
        }
        [Fact]
        public void addPerformerName()
        {
            string a = "The Vampires";
            _perform.GroupName = a;
            Assert.Equal(_perform.GroupName, a);
        }
        [Fact]
        public void addPerformerPass()
        {
            string a = "Dracula";
            _perform.GroupPass = a;
            Assert.Equal(_perform.GroupPass, a);
        }
        [Fact]
        public void addPerformerHour()
        {
            int a = 53;
            _perform.HourlyRate = a;
            Assert.Equal(_perform.HourlyRate, a);
        }
        [Fact]
        public void addPerformerRating()
        {
            string a = "E";
            _perform.Rating = a;
            Assert.Equal(_perform.Rating, a);
        }
        [Fact]
        public void addPerformerType()
        {
            string a = "Heavy Metal";
            _perform.PerformanceType = a;
            Assert.Equal(_perform.PerformanceType, a);
        }
        [Fact]
        public void addPerformerCost()
        {
            int a = 1243;
            _perform.TotalCost = a;
            Assert.Equal(_perform.TotalCost, a);
        }
        [Fact]
        public void addBookingPerf()
        {
            string a = "Dracula";
            _book.GroupName = a;
            Assert.Equal(_book.GroupName, a);
        }
        [Fact]
        public void addBookingId()
        {
            int a = 34;
            _book.BookingId = a;
            Assert.Equal(_book.BookingId, a);
        }
        [Fact]
        public void addBookingDate()
        {
            string a = "2/2/12";
            _book.TimeFrame = a;
            Assert.Equal(_book.TimeFrame, a);
        }
        [Fact]
        public void addBookingStatus()
        {
            string a = "Cancelled";
            _book.BookingStatus = a;
            Assert.Equal(_book.BookingStatus, a);
        }

        [Fact]
        public void addBookingScore()
        {
            int a = 5;
            _book.Score = a;
            Assert.Equal(_book.Score, a);
        }
        [Fact]
        public void addBookingReview()
        {
            string a = "It was a fine show with a long ending";
            _book.Review = a;
            Assert.Equal(_book.Review, a);
        }
        [Fact]
        public void addBookingVenue()
        {
            string a = "Oranges";
            _book.ClientName = a;
            Assert.Equal(_book.ClientName, a);
        }
        [Fact]
        public void addBookingLocation()
        {
            string a = "Idaho";
            _book.Location = a;
            Assert.Equal(_book.Location, a);
        }

        [Fact]
        public void testgetclient()
        {
            var context = CreateContext.getNewContext("TestingDB");
            var repo = new ClientRepo(context);
            var VC = new VenueController(repo);
            IEnumerable<Clients> Result = VC.Get();
            string[] names = { "Alabama Coffee", "Brad's Bistro" };
            int count = 0;
            foreach (Clients c in Result)
            {
                Assert.Equal(c.ClientName, names[count]);
                count++;
            }
        }

        [Fact]
        public void testgetbooking()
        {
            var context = CreateContext.getNewContext("TestingDB");
            var repo = new BookingRepo(context);
            var VC = new BookingController(repo);
            IEnumerable<Bookings> Result = VC.GetBookings();
            string[] names = { "Cancelled","Upcoming" };
            int count = 0;
            foreach (Bookings b in Result)
            {
                Assert.Equal(b.ClientName, names[count]);
                count++;
            }
        }
        [Fact]
        public void testgetPerformer()
        {
            var context = CreateContext.getNewContext("TestingDB");
            var repo = new PerformerRepo(context);
            var VC = new PerformersController(repo);
            IEnumerable<Performers> Result = VC.GetPerformers();
            string[] names = { "Zeals Seals", "Young Ones" };
            int count = 0;
            foreach (Performers p in Result)
            {
                Assert.Equal(p.GroupName, names[count]);
                count++;
            }
        }

        [Fact]
        public void testgettag()
        {
            var context = CreateContext.getNewContext("TestingDB");
            var repo = new TagRepo(context);
            var VC = new TagsController(repo);
            IEnumerable<Tags> Result = VC.GetTags();
            string[] names = { "Loud", "Fun" };
            int count = 0;
            foreach (Tags t in Result)
            {
                Assert.Equal(t.Tag, names[count]);
                count++;
            }
        }

    }
}
