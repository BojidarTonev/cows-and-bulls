using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using CowsAndBullsAPI.Models;

namespace CowsAndBullsAPI.Services.Contracts
{
    public interface IUsersService
    {
        Task<bool> RegisterUser(string username, string password, string rePassword);

        IQueryable<User> All();

        IQueryable<User> Scoreboard();
    }
}