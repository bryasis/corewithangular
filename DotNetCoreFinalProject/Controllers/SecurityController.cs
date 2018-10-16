using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetCoreFinalProject.Data.Entities;
using DotNetCoreFinalProject.Library;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCoreFinalProject.API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        private ISecurityServices service;

        public SecurityController(ISecurityServices service) => this.service = service;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            user = await service.Authenticate(user);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}