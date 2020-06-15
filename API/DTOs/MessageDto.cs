using System;

namespace API.DTOs
{
    public class MessageDto
    {
        public string SenderName { get; set; }
        public string SenderContact { get; set; }
        public string Object { get; set; }
        public string Body { get; set; }
        public DateTime DateReceived { get; set; }

        public MessageDto()
        {
            DateReceived = DateTime.Now;
        }
    }
}