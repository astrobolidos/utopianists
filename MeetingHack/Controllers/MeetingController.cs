using MeetingHack.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MeetingHack.Controllers
{
    public class MeetingController : ApiController
    {
        private readonly MeetingDBContext dbContext = new MeetingDBContext();

        [HttpPost]
        public Meeting Post(Meeting meeting)
        {
            dbContext.Meetings.Add(meeting);
            dbContext.SaveChanges();
            return meeting;
        }

        public Meeting Get(int meetingId)
        {
            return dbContext.Meetings
                            .Include("Room")
                            .FirstOrDefault(x => x.MeetingId == meetingId);
        }
    }
}
