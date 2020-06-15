using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IAnoumaRepository _repos;
        private readonly IMapper _mapper;

        public MessagesController(IAnoumaRepository repos, IMapper mapper)
        {
            _repos = repos;
            _mapper = mapper;
        }
        [Authorize(Roles = "AdminUser,Moderator")]
        [HttpGet]
        public async Task<IActionResult> GetMessages()
        {
            var messages = await _repos.GetMessages();
            return Ok(messages);

        }
        [Authorize(Roles = "AdminUser,Moderator")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMessage(int id)
        {
            var message = await _repos.GetMessage(id);
            if (message == null)
            {
                return NotFound();
            }
            return Ok(message);
        }

        [HttpPost]
        public async Task<IActionResult> AddMessage(MessageDto messageDto)
        {
            var message = _mapper.Map<Message>(messageDto);
            _repos.Add(message);
            if (await _repos.SaveAll())
            {
                return Ok("Message added successfully");
            }

            return BadRequest("Sorry, Failed to send message");
        }
    }
}