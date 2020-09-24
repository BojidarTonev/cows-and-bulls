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

        public async Task<IAuthResult> RegisterUser(string username, string password, string rePassword)
        {
            var result = new AuthResult("register", null);
            if (password != rePassword)
            {
                result.isSuccesful = false;
                result.errorMessage = "Passwords doesn't match!";
                return result;
            }
            var user = this._userRepository.All().Any(u => u.Username == username);
            if (user)
            {
                result.isSuccesful = false;
                result.errorMessage = "Username is taken!";
                return result;
            }
            var userToRegister = new User()
            {
                Username = username,
                Password = password
            };
            await this._userRepository.AddAsync(userToRegister);
            await this._userRepository.SaveChangesAsync();

            result.user = userToRegister;
            result.isSuccesful = true;

            return result;
        }

        public IAuthResult LoginUser(string username, string password)
        {
            var result = new AuthResult("login", null);
            var user = this._userRepository.All().FirstOrDefault(u => u.Username == username && u.Password == password);
            if (user == null)
            {
                result.isSuccesful = false;
                result.errorMessage = "Wrong credentials!";
                return result;
            }
            result.isSuccesful = true;
            result.user = user;
            return result;
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
    public class AuthResult : IAuthResult
    {
        public string operation { get; set; }
        public User user { get; set; }
        public bool isSuccesful { get; set; }
        public string errorMessage { get; set; }

        public AuthResult(string operationParam, User userParam)
        {
            this.operation = operationParam;
            this.user = userParam;
        }
    }
}