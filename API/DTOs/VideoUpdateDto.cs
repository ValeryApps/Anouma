using System;

namespace API.DTOs
{
  public class VideoUpdateDto
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string Intro { get; set; }
    public string VideoUrl { get; set; }
    public string Category { get; set; }
    public string ThumbnailUrl { get; set; }
    public string Author { get; set; }
  }
}