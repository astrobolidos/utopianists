using System;
using System.Collections.Generic;

namespace MeetingHack.DataAccess.Models
{
    public partial class Meeting
    {
        public int MeetingId { get; set; }
        public Nullable<int> RoomId { get; set; }
        public Nullable<System.DateTime> BeginTime { get; set; }
        public Nullable<System.DateTime> EndTime { get; set; }
        public virtual Room Room { get; set; }
    }
}
