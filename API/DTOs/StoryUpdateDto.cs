using System;
using Microsoft.AspNetCore.Http;

namespace API.DTOs
{
  public class StoryUpdateDto
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string Intro { get; set; }
    public string Content { get; set; }
    public string Category { get; set; }
    public string Slug { get; set; }
    public string Author { get; set; }
    public string ImageUrl { get; set; }
  }
}