using System;
using Microsoft.AspNetCore.Http;

namespace API.DTOs
{
  public class ImageToReturnDto
  {
    public int Id { get; set; }
    public string Url { get; set; }
    public IFormFile File { get; set; }
    public string ImageName { get; set; }
    public DateTime DateAdded { get; set; }

    public ImageToReturnDto()
    {
      DateAdded = DateTime.Now;
    }
  }
}