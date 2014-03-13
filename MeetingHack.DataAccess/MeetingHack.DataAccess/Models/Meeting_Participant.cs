using System;
using System.Collections.Generic;

namespace MeetingHack.DataAccess.Models
{
    public partial class Meeting_Participant
    {
        public int MeetingParticipantId { get; set; }
        public Nullable<int> MeetingId { get; set; }
        public Nullable<int> PeopleId { get; set; }
    }
}
