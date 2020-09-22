using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using CowsAndBullsAPI.Models;

namespace CowsAndBullsAPI.Services.Contracts
{
    public interface IGameService
    {
        Task<bool> RegisterGame(string userId, bool hasWon, int movesCount);

        Game[] GetUserGames(string userId);
    }
}