using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CowsAndBullsAPI.Services.Contracts;
using CowsAndBullsAPI.Repository.Contracts;
using System.Collections.Generic;
using System.Linq;

namespace CowsAndBullsAPI.Services
{
    public class UserService : IUsersService
    {
        private readonly IRepository<Game> _gameRepository;
        private readonly IRepository<User> _userRepository;
        public UserService(IRepository<Game> gameRepository, IRepository<User> userRepository)
        {
            this._gameRepository = gameRepository;
            this._userRepository = userRepository;
        }

        public async Task<bool> RegisterUser(string username, string password, string rePassword)
        {
            if (password != rePassword)
            {
                return false;
            }
            var user = this._userRepository.All().Any(u => u.Username == username);
            if (user)
            {
                return false;
            }
            var userToRegister = new User()
            {
                Username = username,
                Password = password
            };
            await this._userRepository.AddAsync(userToRegister);
            await this._userRepository.SaveChangesAsync();

            return true;
        }

        public object LoginUser(string username, string password)
        {
            var user = this._userRepository.All().Any(u => u.Username == username && u.Password == password);
            if (!user)
            {
                return null;
            }
            return user;
        }

        public IEnumerable<IScoreboardResult> Scoreboard()
        {
            var result = new List<ScoreboardResult>();
            var users = this._userRepository.All().Include(u => u.Games).OrderBy(u => u.Games.Count(g => g.HasWon)).Take(25);
            foreach (var user in users)
            {
                var attempts = 0;
                var wins = 0;
                foreach (var game in user.Games)
                {
                    attempts += game.Moves;
                    if (game.HasWon)
                    {
                        wins++;
                    }
                }
                var scoreboardRes = new ScoreboardResult(user.Username, wins, attempts);
                result.Add(scoreboardRes);
            }

            return result;
        }
    }

    public class ScoreboardResult : IScoreboardResult
    {

        public string username { get; set; }
        public int winCount { get; set; }
        public int summedAttempts { get; set; }

        public ScoreboardResult(string username, int wins, int attempts)
        {
            this.username = username;
            this.winCount = wins;
            this.summedAttempts = attempts;
        }
    }
}