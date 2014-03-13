using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using MeetingHack.DataAccess.Models.Mapping;

namespace MeetingHack.DataAccess.Models
{
    public partial class MeetingDBContext : DbContext
    {
        static MeetingDBContext()
        {
            Database.SetInitializer<MeetingDBContext>(null);
        }

        public MeetingDBContext()
            : base("Name=MeetingDBContext")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Meeting> Meetings { get; set; }
        public DbSet<Meeting_Participant> Meeting_Participant { get; set; }
        public DbSet<Person> People { get; set; }
        public DbSet<Room> Rooms { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new MeetingMap());
            modelBuilder.Configurations.Add(new Meeting_ParticipantMap());
            modelBuilder.Configurations.Add(new PersonMap());
            modelBuilder.Configurations.Add(new RoomMap());

            this.IgnoreProperties(modelBuilder);
        }

        private void IgnoreProperties(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Room>().Ignore(t => t.FloorNumber);
            modelBuilder.Entity<Meeting>().Ignore(m => m.PersonIds);
        }

    }
}
