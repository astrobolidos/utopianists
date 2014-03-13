using System;
using System.Collections.Generic;

namespace MeetingHack.DataAccess.Models
{
    public partial class Person
    {
        public int PersonId { get; set; }
        public string PersonName { get; set; }
        public string ContactNr { get; set; }
        public string Email { get; set; }
    }
}
