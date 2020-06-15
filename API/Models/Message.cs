using System;

namespace API.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string SenderName { get; set; }
        public string SenderContact { get; set; }
        public string Object { get; set; }
        public string Body { get; set; }
        public DateTime DateReceived { get; set; }
    }
}