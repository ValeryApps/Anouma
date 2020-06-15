using System;
using System.Collections.Generic;
using System.Linq;
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
    public class VideosController : Controller
    {
        private readonly IAnoumaRepository _repos;
        private readonly IMapper _mapper;

        public VideosController(IAnoumaRepository repos, IMapper mapper)
        {
            _repos = repos;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> getVideos([FromQuery] Params param)
        {
            var videos = await _repos.GetVideos(param);
            Response.AddPagination(videos.CurrentPage, videos.PageSize, videos.TotalItems, videos.TotalPages);
            return Ok(videos);
        }

        [HttpGet("{id}", Name = "GetVideo")]
        public async Task<IActionResult> GetVideo(int id)
        {
            var video = await _repos.GetVideo(id);
            video.Views++;
            return Ok(video);
        }
        [Authorize(Roles = "AdminUser, Moderator")]
        [HttpPost]
        public async Task<IActionResult> CreateVideo(VideoCreateDto videoCreateDto)
        {
            var video = _mapper.Map<Video>(videoCreateDto);
            video.DatePosted = DateTime.Now;
            _repos.Add(video);
            if (await _repos.SaveAll())
            {
                return CreatedAtRoute("GetVideo", new { id = video.Id }, video);
            }

            return BadRequest("Failed adding video");

        }
        [Authorize(Roles = "AdminUser,Moderator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVideo(int id, VideoUpdateDto videoUpdateDto)
        {
            var video = await _repos.GetVideo(id);
            if (video != null)
            {
                _mapper.Map(videoUpdateDto, video);
            }

            if (await _repos.SaveAll())
                return NoContent();
            return BadRequest("Update failed");
        }
        [Authorize(Roles = "AdminUser,Moderator")]
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteVideo(int id)
        {
            var video = await _repos.GetVideo(id);
            if (video == null) 
                return BadRequest("Video does not exist");
            _repos.Remove(video);
            if (await _repos.SaveAll())
            {
                return NoContent();
            }

            return BadRequest(" failed to delete video");
        }
    }
}
