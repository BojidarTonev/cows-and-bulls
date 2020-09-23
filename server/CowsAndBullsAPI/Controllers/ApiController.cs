using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CowsAndBullsAPI.Controllers
{
    [ApiController]
    public class ApiController : ControllerBase
    {
        //private readonly IDatService _datService;

        //public ApiController(IDatService dataService)
        //{
        //this._datService = dataService;
        //}

        [HttpGet]
        [Route("Scoreboard")]
        public IActionResult Scoreboard()
        {
            return Ok("vs tochno");
        }

        [HttpGet]
        [Route("test")]
        public IActionResult Test()
        {
            return Ok("ailqk");
        }
    }
}
