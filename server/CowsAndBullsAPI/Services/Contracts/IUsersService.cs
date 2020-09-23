using System.Threading.Tasks;
using System.Collections.Generic;

namespace CowsAndBullsAPI.Services.Contracts
{
    public interface IUsersService
    {
        Task<bool> RegisterUser(string username, string password, string rePassword);

        object LoginUser(string username, string password);

        IEnumerable<IScoreboardResult> Scoreboard();
    }
}