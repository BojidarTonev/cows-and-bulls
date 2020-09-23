using Microsoft.AspNetCore.Mvc;
using CowsAndBullsAPI.Services.Contracts;

namespace CowsAndBullsAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiController : ControllerBase
    {
        private readonly IUsersService _usersService;
        private readonly IGameService _gameService;

        public ApiController(IUsersService usersService, IGameService gameService)
        {
            this._usersService = usersService;
            this._gameService = gameService;
        }

        [HttpGet]
        [Route("register-game")]
        public ActionResult RegisterGame()
        {
            return Ok();
        }

        [HttpGet]
        [Route("scoreboard")]
        public IActionResult Scoreboard()
        {
            var res = this._usersService.Scoreboard();
            return Ok(res);
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(string username, string password)
        {
            var res = this._usersService.LoginUser(username, password);
            return Ok(res);
        }
        [HttpPost]
        [Route("register")]
        public IActionResult Register(string username, string password, string rePassword)
        {
            var res = this._usersService.RegisterUser(username, password, rePassword);

            return Ok(res);
        }
    }
}
