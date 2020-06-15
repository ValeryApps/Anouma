using System;
using Microsoft.AspNetCore.Http;

namespace API.DTOs
{
  public class ImageCreationDto
  {
    public string Url { get; set; }
    public IFormFile File { get; set; }
    public string publicId { get; set; }
    public DateTime DateAdded { get; set; }

    public ImageCreationDto()
    {
      DateAdded = DateTime.Now;
    }
  }
}