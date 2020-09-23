using System.Threading.Tasks;
using CowsAndBullsAPI.Services.Contracts;
using CowsAndBullsAPI.Repository.Contracts;

namespace CowsAndBullsAPI.Services
{
    public class GameService : IGameService
    {
        private readonly IRepository<Game> _gameRepository;
        private readonly IRepository<User> _userRepository;
        public GameService(IRepository<Game> gameRepository, IRepository<User> userRepository)
        {
            this._gameRepository = gameRepository;
            this._userRepository = userRepository;
        }

        public async Task<bool> RegisterGame(string userId, bool hasWon, int movesCount)
        {
            var game = new Game()
            {
                UserId = userId,
                HasWon = hasWon,
                Moves = movesCount
            };

            await this._gameRepository.AddAsync(game);
            await this._gameRepository.SaveChangesAsync();

            return true;
        }
    }
}