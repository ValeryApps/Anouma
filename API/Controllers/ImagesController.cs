using System.Threading.Tasks;
using API.DTOs;
using API.Helpers;
using API.Models;
using API.Services;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IAnoumaRepository _repos;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudSetting;
        private readonly Cloudinary _cloudinary;

        public ImagesController(IAnoumaRepository repos, IMapper mapper, IOptions<CloudinarySettings> cloudSetting)
        {
            _repos = repos;
            _mapper = mapper;
            _cloudSetting = cloudSetting;

            Account acc = new Account(
              _cloudSetting.Value.CloudName,
              _cloudSetting.Value.ApiKey,
              _cloudSetting.Value.ApiSecret
              );
            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetImage")]
        public async Task<IActionResult> GetImage(int id)
        {
            var image = await _repos.GetImage(id);
            if (image != null)
                return Ok(image);
            return BadRequest("Image not found");
        }

        [HttpPost("stories/{storyId}")]
        public async Task<IActionResult> AddImage(int storyId, [FromQuery] ImageCreationDto dto)
        {
            var storyFromRepos = await _repos.GetStory(storyId);
            if (storyFromRepos == null)
                return BadRequest("Story not found");

            var file = dto.File;
            if (file == null) return BadRequest("No such file");

            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation().Width(1024).Height(570).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            dto.Url = uploadResult.Uri.ToString();
            dto.publicId = uploadResult.PublicId;
            storyFromRepos.ImageUrl = dto.Url;
            if (await _repos.SaveAll())
            {
                return Ok("Image added successfully");
            }
            return BadRequest("failed");
        }

        // Video image

        [HttpPost("videos/{videoId}/")]
        public async Task<IActionResult> AddVideoThumbnail(int videoId, [FromQuery] ImageCreationDto dto)
        {
            var videoFromRepos = await _repos.GetVideo(videoId);
            if (videoFromRepos == null)
                return BadRequest("Video not found");

            var file = dto.File;
            if (file == null) return BadRequest("No such file");

            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation().Width(1024).Height(570).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            dto.Url = uploadResult.Uri.ToString();
            dto.publicId = uploadResult.PublicId;
            videoFromRepos.ThumbnailUrl = dto.Url;
            if (await _repos.SaveAll())
            {
                return Ok("Image added successfully");
            }
            return BadRequest("failed");
        }
    }

}