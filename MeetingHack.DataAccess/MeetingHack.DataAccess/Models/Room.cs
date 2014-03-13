using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace MeetingHack.DataAccess.Models
{
    public partial class Room
    {
        public Room()
        {
            this.Meetings = new List<Meeting>();
        }

        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public string Location { get; set; }
        public Nullable<int> Capacity { get; set; }
        public string BusinessPhone { get; set; }
        public string EmailAdress { get; set; }
        [JsonIgnore]
        public virtual ICollection<Meeting> Meetings { get; set; }

        public int FloorNumber
        {
            get
            {
                return int.Parse(this.Location.Substring(0, this.Location.IndexOf("(") - 1).Replace("Level", string.Empty).Trim());
            }
        }

    }
}
