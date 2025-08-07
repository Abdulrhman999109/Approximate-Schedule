using Microsoft.EntityFrameworkCore;

namespace ApproximateAPI.Models
{
    public partial class ApproximateDbApiContext : DbContext
    {
        public ApproximateDbApiContext(DbContextOptions<ApproximateDbApiContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Userdatum> Userdata { get; set; }
        public virtual DbSet<TaskEntity> TaskEntities { get; set; }
        public virtual DbSet<Break> Breaks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Userdatum>(entity =>
            {
                entity.ToTable("Userdata"); 
                entity.HasKey(e => e.UserId);
                entity.Property(e => e.Username).IsRequired();
                entity.Property(e => e.PasswordHash).IsRequired();
            });

            modelBuilder.Entity<TaskEntity>(entity =>
            {
                entity.ToTable("TaskEntity");
                entity.HasKey(e => e.TaskId);
                entity.Property(e => e.Title).IsRequired();
                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId);
            });

            modelBuilder.Entity<Break>(entity =>
            {
                entity.ToTable("Break");
                entity.HasKey(e => e.BreakId);
                entity.Property(e => e.Breakname).IsRequired();
                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId);
            });
        }
    }
}