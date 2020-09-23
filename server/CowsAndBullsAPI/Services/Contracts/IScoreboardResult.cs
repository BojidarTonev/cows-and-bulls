namespace CowsAndBullsAPI.Services.Contracts
{
    public interface IScoreboardResult
    {
        public string username { get; set; }

        public int winCount { get; set; }

        public int summedAttempts { get; set; }

    }
}