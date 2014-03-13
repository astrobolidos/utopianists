using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MeetingHack.DataAccess.Models.Mapping
{
    public class Meeting_ParticipantMap : EntityTypeConfiguration<Meeting_Participant>
    {
        public Meeting_ParticipantMap()
        {
            // Primary Key
            this.HasKey(t => t.MeetingParticipantId);

            // Properties
            // Table & Column Mappings
            this.ToTable("Meeting_Participant");
            this.Property(t => t.MeetingParticipantId).HasColumnName("MeetingParticipantId");
            this.Property(t => t.MeetingId).HasColumnName("MeetingId");
            this.Property(t => t.PeopleId).HasColumnName("PeopleId");
        }
    }
}
