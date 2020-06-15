using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [Authorize(Roles = "AdminUser")]
  [Route("api/[controller]")]
  [ApiController]
  public class AdminController : ControllerBase
  {
    private readonly DataContext _context;
    private readonly UserManager<User> _userManager;
   
    public AdminController(DataContext context, UserManager<User> userManager)
    {
      _context = context;
      _userManager = userManager; 
    }
  
     [HttpGet("Users")]
    public async Task<IActionResult> GetUsers()
    {
      var users = await (from user in _context.Users
        orderby user.UserName
        select new
        {
          id = user.Id,
          userName = user.UserName,
          roles = (from userRole in user.UserRoles
              join role in _context.Roles 
              on userRole.RoleId equals role.Id 
              select role.Name).ToList()
        }).ToListAsync();
      return Ok(users);
    }

    [HttpGet("AllStories")]
    public async Task<IActionResult> GetAllStories()
    {
      var stories = await _context.Stories.OrderByDescending(x=>x.DatePosted).ToListAsync();
      return Ok(stories);
    }

    [HttpGet("AllVideos")]
    public async Task<IActionResult> GetAllVideos()
    {
      var videos = _context.Videos.OrderByDescending(x=>x.DatePosted);
      return Ok( await videos.ToListAsync());
    }
    [HttpPost("EditRoles/{userName}")]
    public async Task<IActionResult> EditRoles(string userName, EditRoleDto editRoleDto)
    {
      var user = await _userManager.FindByNameAsync(userName);
   
      if (user == null) return BadRequest("User not found");
      
      var userRoles = await _userManager.GetRolesAsync(user);
     
      var selectedRoles = editRoleDto.RoleNames;
      selectedRoles = selectedRoles ?? new string[]{};
      
      var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));
      
      if (!result.Succeeded) 
        return BadRequest("Failed to add roles");
      
      
      result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));
      
      if (!result.Succeeded) 
        return BadRequest("Failed to remove roles");
      
      return Ok(await _userManager.GetRolesAsync(user));
    }
  }
}