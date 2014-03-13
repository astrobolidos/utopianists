using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MeetingHack.DataAccess.Models.Mapping
{
    public class MeetingMap : EntityTypeConfiguration<Meeting>
    {
        public MeetingMap()
        {
            // Primary Key
            this.HasKey(t => t.MeetingId);

            // Properties
            // Table & Column Mappings
            this.ToTable("Meeting");
            this.Property(t => t.MeetingId).HasColumnName("MeetingId");
            this.Property(t => t.RoomId).HasColumnName("RoomId");
            this.Property(t => t.BeginTime).HasColumnName("BeginTime");
            this.Property(t => t.EndTime).HasColumnName("EndTime");

            // Relationships
            this.HasOptional(t => t.Room)
                .WithMany(t => t.Meetings)
                .HasForeignKey(d => d.RoomId);

        }
    }
}
