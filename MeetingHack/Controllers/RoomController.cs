using MeetingHack.DataAccess.Models;
using MeetingHack.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MeetingHack.Controllers
{
    public class RoomController : ApiController
    {
        private MeetingDBContext dbContext = new MeetingDBContext();

        public IEnumerable<Room> Get(int floorNumber)
        {
            var rms = dbContext.Rooms.ToList();
            return rms.Where(x => x.FloorNumber == floorNumber);
        }

        private List<Roomy> SetupDummyRooms()
        {
            var rooms = new List<Roomy>
                            {
                                new Roomy{Name="Swift",Capacity = 25,PhoneNumber = "01-1234567",RoomNumber = "4.125"},
                                new Roomy{Name="Heaney",Capacity = 30,PhoneNumber = "01-9876543",RoomNumber = "4.121"}
                            };

            return rooms;
        }
    }
}
