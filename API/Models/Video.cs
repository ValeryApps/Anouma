using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Video
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Intro { get; set; }
        public string VideoUrl { get; set; }
        public DateTime DatePosted { get; set; }
        public string Category { get; set; }
        public int Views { get; set; } = 1;
        public string ThumbnailUrl { get; set; }
        public string Author { get; set; }
    }
}
