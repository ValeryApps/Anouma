using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using ServerApp.Dtos;



namespace API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
  public class AccountController : ControllerBase
  {
    private readonly IConfiguration _config;
		private readonly IMapper _mapper;
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;
		private readonly RoleManager<Role> _roleManager;

		public AccountController( IConfiguration config, IMapper mapper,
			UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<Role> roleManager)
		{
			_config = config;
			_mapper = mapper;
			_userManager = userManager;
			_signInManager = signInManager;
			_roleManager = roleManager;
		}

		[HttpGet("{Id}", Name = "GetUser")]
		public async Task<IActionResult> GetUSer(int id)
		{
			var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);
			var userToReturn = _mapper.Map<UserToReturn>(user);
			return Ok(userToReturn);
		} 

		[HttpPost("Register")]
		public async Task<IActionResult> Register(UserForRegisterDto userToRegister)
		{
			IdentityResult answer = new IdentityResult();
			var user = _mapper.Map<User>(userToRegister);
			var userToReturn = _mapper.Map<UserToReturn>(user);
			var result = await _userManager.CreateAsync(user, userToRegister.Password);
			var role = _roleManager.FindByNameAsync("Member");
			if (role != null)
			{
				answer = await _userManager.AddToRoleAsync(user, "Member");
			}
	
			if (result.Succeeded && answer.Succeeded)
			{
				return CreatedAtRoute("GetUser", new {id = user.Id}, userToReturn);
			}
			return BadRequest(result.Errors);
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login(UserForLoginDto userForLogin)
		{
			var userDto = await _userManager.FindByNameAsync(userForLogin.Username);
			if (userDto == null) return Unauthorized();  
			var result = await _signInManager.CheckPasswordSignInAsync(userDto, userForLogin.Password, false);
			if (result.Succeeded)
			{
				var user = _mapper.Map<User >(userDto);
			var userToReturn = _mapper.Map<UserListDto>(user);
			var jwtToken = GenerateJwtToken(user);
				return Ok(new
				{
					token = jwtToken,
					user = userToReturn
				});
			}
			return Unauthorized();
		}

		private string GenerateJwtToken(User user)
		{
			var claims = new List<Claim>
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim(ClaimTypes.Name, user.UserName)
			};
			var roles = _userManager.GetRolesAsync(user).Result;
			foreach (var role in roles)
			{
				claims.Add(new Claim(ClaimTypes.Role, role));
			}
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.Now.AddDays(1),
				SigningCredentials = creds
			};
			
			var tokenHandler = new JwtSecurityTokenHandler();
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}

  }
}