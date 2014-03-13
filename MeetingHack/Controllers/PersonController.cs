using MeetingHack.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MeetingHack.Controllers
{
    public class PersonController : ApiController
    {
        private MeetingDBContext dbContext = new MeetingDBContext();

        public IEnumerable<Person> Get()
        {
            return dbContext.People.ToList();
        }
    }
}
