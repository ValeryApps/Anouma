using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace API.DTOs
{
    public class StoryCreationDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Intro { get; set; }
        [Required]
        public string Content { get; set; }
        public string Slug { get; set; }
        public DateTime DatePosted { get; set; }
        [Required]
        public string Category { get; set; }
        public string ImageUrl { get; set; }
        public string Author { get; set; }

       
    }
}