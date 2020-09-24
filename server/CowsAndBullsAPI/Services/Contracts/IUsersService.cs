using System.Threading.Tasks;
using System.Collections.Generic;

namespace CowsAndBullsAPI.Services.Contracts
{
    public interface IUsersService
    {
        Task<IAuthResult> RegisterUser(string username, string password, string rePassword);

        IAuthResult LoginUser(string username, string password);

        IEnumerable<IScoreboardResult> Scoreboard();
    }
}