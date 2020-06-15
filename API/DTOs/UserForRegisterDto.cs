using System;
using System.ComponentModel.DataAnnotations;

namespace ServerApp.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(28, MinimumLength = 6, ErrorMessage = "You must specify a password between 6 and 28 characters")]
        public string Password { get; set; }
        [Required]
        [StringLength(28, MinimumLength = 6, ErrorMessage = "You must specify a password between 6 and 28 characters")]
        public string ConfirmPassword { get; set; }

    }
}