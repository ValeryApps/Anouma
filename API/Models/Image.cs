using System;
namespace API.Models
{
  public class Image
  {
    public int Id { get; set; }
    public string Url { get; set; }
    public DateTime DateAdded { get; set; }
    public Story Story { get; set; }
    public string PubliId { get; set; }
    public int StoryId { get; set; }
    public bool IsMain { get; set; }
  }
} 