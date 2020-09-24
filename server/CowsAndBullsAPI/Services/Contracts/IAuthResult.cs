using CowsAndBullsAPI.Models;

namespace CowsAndBullsAPI.Services.Contracts
{
    public interface IAuthResult
    {
        public string operation { get; set; }

        public User user { get; set; }

        public bool isSuccesful { get; set; }

        public string errorMessage { get; set; }

    }
}