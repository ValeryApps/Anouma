using System;

namespace API.DTOs
{
  public class VideoCreateDto
  {
    public string Title { get; set; }
    public string Intro { get; set; }
    public string VideoUrl { get; set; }
    public DateTime DatePosted { get; set; }
    public string Category { get; set; }
      public string ThumbnailUrl { get; set; }
    public string Author { get; set; }
  }
}