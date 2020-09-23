using CowsAndBullsAPI.Models;
using System.Collections.Generic;

namespace CowsAndBullsAPI
{
    public class DbSeeder
    {
        public async Task SeedAsync()
        {
            var serviceCollection = new ServiceCollection();
            ConfigureServices(serviceCollection);
            IServiceProvider serviceProvider = serviceCollection.BuildServiceProvider(true);

            using (var serviceScope = serviceProvider.CreateScope())
            {
                serviceProvider = serviceScope.ServiceProvider;
                await SeedDatabaseAsync(serviceProvider);
            }
        }
        private static async Task SeedDatabaseAsync(IServiceProvider serviceProvider)
        {
        }

        private static async Task SeedUsers(IServiceProvicer serviceProvider)
        {
            var db = serviceProvider.GetService<CowsAndBullsContext>();
            if (!db.Users.AnyAsync().Result)
            {
                var users = new List<User>();

                for (int i = 0; i < 25; i++)
                {
                    var user = new User();
                    var games = new List<Game>();

                    for (int k = 0; k < 5; k++)
                    {
                        var game = new Game();
                        
                    }
                    user.Username = $"User{i}";
                    user.Password = $"password{i}";

                    users.Add(user);
                }

                db.Users.AddRange(users);
                db.SaveChanges();

                Console.WriteLine("Successfully inserted 25 user entities into the database.");
            }

        }
    }
}