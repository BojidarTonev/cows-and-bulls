public class Game
{
    public string Id { get; set; }
    public string UserId { get; set; }
    public virtual User User { get; set; }

    public int Moves { get; set; }
    public bool HasWon { get; set; }
}