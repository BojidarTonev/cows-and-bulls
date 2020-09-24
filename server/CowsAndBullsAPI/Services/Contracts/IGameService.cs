using System.Threading.Tasks;

namespace CowsAndBullsAPI.Services.Contracts
{
    public interface IGameService
    {
        Task<bool> RegisterGame(string userId, int movesCount, bool hasWon);
    }
}