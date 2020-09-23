using Microsoft.EntityFrameworkCore;

namespace CowsAndBullsAPI.Models
{
    public class CowsAndBullsContext : DbContext
    {
        public CowsAndBullsContext(DbContextOptions<CowsAndBullsContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
            .Property(p => p.Id)
            .ValueGeneratedOnAdd();

            builder.Entity<Game>()
            .Property(p => p.Id)
            .ValueGeneratedOnAdd();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Game> Games { get; set; }
    }
}