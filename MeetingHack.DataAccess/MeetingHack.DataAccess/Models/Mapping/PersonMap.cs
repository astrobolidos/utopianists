using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MeetingHack.DataAccess.Models.Mapping
{
    public class PersonMap : EntityTypeConfiguration<Person>
    {
        public PersonMap()
        {
            // Primary Key
            this.HasKey(t => t.PersonId);

            // Properties
            this.Property(t => t.PersonName)
                .HasMaxLength(50);

            this.Property(t => t.ContactNr)
                .HasMaxLength(50);

            this.Property(t => t.Email)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Person");
            this.Property(t => t.PersonId).HasColumnName("PersonId");
            this.Property(t => t.PersonName).HasColumnName("PersonName");
            this.Property(t => t.ContactNr).HasColumnName("ContactNr");
            this.Property(t => t.Email).HasColumnName("Email");
        }
    }
}
