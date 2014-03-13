using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MeetingHack.DataAccess.Models.Mapping
{
    public class RoomMap : EntityTypeConfiguration<Room>
    {
        public RoomMap()
        {
            // Primary Key
            this.HasKey(t => t.RoomId);

            // Properties
            this.Property(t => t.RoomName)
                .HasMaxLength(50);

            this.Property(t => t.Location)
                .HasMaxLength(50);

            this.Property(t => t.BusinessPhone)
                .HasMaxLength(50);

            this.Property(t => t.EmailAdress)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Room");
            this.Property(t => t.RoomId).HasColumnName("RoomId");
            this.Property(t => t.RoomName).HasColumnName("RoomName");
            this.Property(t => t.Location).HasColumnName("Location");
            this.Property(t => t.Capacity).HasColumnName("Capacity");
            this.Property(t => t.BusinessPhone).HasColumnName("BusinessPhone");
            this.Property(t => t.EmailAdress).HasColumnName("EmailAdress");
        }
    }
}
