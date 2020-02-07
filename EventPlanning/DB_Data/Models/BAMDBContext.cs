using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DB_Data.Models
{
    public partial class BAMDBContext : DbContext
    {
        public BAMDBContext()
        {
        }

        public BAMDBContext(DbContextOptions<BAMDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bookings> Bookings { get; set; }
        public virtual DbSet<Clients> Clients { get; set; }
        public virtual DbSet<Performers> Performers { get; set; }
        public virtual DbSet<Tags> Tags { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:200106utaems-miles.database.windows.net,1433;Initial Catalog=BAMDB;Persist Security Info=False;User ID=MilesZachery;Password=@HeinekenSirius3284;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bookings>(entity =>
            {
                entity.HasKey(e => e.BookingId)
                    .HasName("PK__Bookings__73951AEDA7354A31");

                entity.Property(e => e.BookingStatus)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ClientName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.GroupName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Location)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Review)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TimeFrame)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.ClientNameNavigation)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.ClientName)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Bookings__Client__5441852A");

                entity.HasOne(d => d.GroupNameNavigation)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.GroupName)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Bookings__GroupN__534D60F1");
            });

            modelBuilder.Entity<Clients>(entity =>
            {
                entity.HasKey(e => e.ClientName)
                    .HasName("PK__Clients__65800DA1C3926642");

                entity.Property(e => e.ClientName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ClientPass)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Performers>(entity =>
            {
                entity.HasKey(e => e.GroupName)
                    .HasName("PK__Performe__6EFCD435AAFF8CD8");

                entity.Property(e => e.GroupName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.GroupPass)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.HourlyRate).HasColumnType("money");

                entity.Property(e => e.PerformanceType)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Rating)
                    .IsRequired()
                    .HasColumnName("rating")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TotalCost)
                    .HasColumnName("totalCost")
                    .HasColumnType("money");
            });

            modelBuilder.Entity<Tags>(entity =>
            {
                entity.HasKey(e => e.TagId)
                    .HasName("PK__Tags__50FC0157CF13FC1A");

                entity.Property(e => e.TagId).HasColumnName("tagId");

                entity.Property(e => e.GroupName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Tag)
                    .IsRequired()
                    .HasColumnName("tag")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.GroupNameNavigation)
                    .WithMany(p => p.Tags)
                    .HasForeignKey(d => d.GroupName)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Tags__GroupName__571DF1D5");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
