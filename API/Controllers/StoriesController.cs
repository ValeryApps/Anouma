using System;
using System.Threading.Tasks;
using API.DTOs;
using API.Helpers;
using API.Models;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
  
    [Route("api/[controller]")]
    [ApiController]
    public class StoriesController : ControllerBase
    {
        private readonly IAnoumaRepository _repos;
        private readonly IMapper _mapper;
 
        public StoriesController(IAnoumaRepository repos, IMapper mapper)
        {
            _repos = repos;
            _mapper = mapper;
         }
        [HttpGet]
        public async Task<IActionResult> GetStories([FromQuery]Params param)
        {
          
            var stories = await _repos.GetStories(param);
            
            Response.AddPagination(stories.CurrentPage, stories.PageSize, stories.TotalItems, stories.TotalPages);
            return Ok(stories);
        }
        [HttpGet("mostRead")]
        public async Task<IActionResult> GetMostReadStories()
        {

            var stories = await _repos.GetMostReadStories();
            return Ok(stories);
        }

        [HttpGet("{slug}", Name = "GetStory")]
        public async Task<IActionResult> GetStory(string slug)
        {
            var story = await _repos.GetStory(slug);
            story.Views++;

            if (await _repos.SaveAll())
            {
                return Ok(story);
            }

            return BadRequest("Failed to load resources");
        }
        
        [Authorize(Roles = ", AdminUser, Moderator")]
        [HttpPost]
        public async Task<IActionResult> AddStory(StoryCreationDto storiesDto)
        {
            var slug = storiesDto.Title.Replace(" ", "-");
            var date = DateTime.Now.ToShortDateString();
            date = date.Replace("/", "-");
            storiesDto.Slug = slug.Replace("?", "a") + "-date-" + date;
            var story = _mapper.Map<Story>(storiesDto);
            story.DatePosted = DateTime.Now;
            _repos.Add(story);
           if (await _repos.SaveAll())
           { 
               return CreatedAtRoute("GetStory", new {slug = story.Slug},story);
           }
        
           return BadRequest("failed");
        }
        
        
        [Authorize(Roles = "AdminUser, Moderator")]
        [HttpPut("{slug}")]
        public async Task<IActionResult> UpdateStory(string slug, StoryUpdateDto storyUpdateDto)
        {
            var storyFromRepos = await _repos.GetStory(slug);
            if (storyFromRepos == null)
                return BadRequest("Story does not exist");
            _mapper.Map(storyUpdateDto, storyFromRepos);
            if (await _repos.SaveAll())
            {
                return NoContent();
            }

            return BadRequest("Update failed on save");
        }

        [Authorize(Roles = "AdminUser, Moderator")]
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> RemoveStory(int id)
        {
            var story = await _repos.GetStory(id);
            if (story == null)
                return NotFound();
            _repos.Remove(story);
            if (await _repos.SaveAll())
                return NoContent();
            return BadRequest("Failed to delete story");
        }
    }
}
