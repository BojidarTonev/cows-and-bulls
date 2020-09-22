using System.Threading.Tasks;
using CowsAndBullsAPI.Services.Contracts;
using CowsAndBullsAPI.Repository.Contracts;
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

        public IQueryable<User> All()
        {
            return this._userRepository.All();
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

            return true;
        }

        public IQueryable<User> Scoreboard()
        {
            return this._userRepository.All().Take(25);
        }
    }
}