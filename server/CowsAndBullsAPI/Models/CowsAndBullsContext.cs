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

        public DbSet<User> Users { get; set; }
        public DbSet<Game> Games { get; set; }
    }
}