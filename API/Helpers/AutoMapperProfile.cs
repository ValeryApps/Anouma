using System.Linq;
using API.DTOs;
using API.Models;
using AutoMapper;
using ServerApp.Dtos;

namespace API.Helpers
{
  public class AutoMapperProfile:Profile
  {
    public AutoMapperProfile()
    {
      CreateMap<StoryCreationDto, Story>();
      CreateMap<StoryUpdateDto, Story>();
      CreateMap<VideoUpdateDto, Video>();
      CreateMap<ImageCreationDto, Image>();
      CreateMap<Image, ImageToReturnDto>();
      CreateMap<VideoCreateDto, Video>();
      CreateMap<UserForRegisterDto, User>();
      CreateMap<UserForLoginDto, User>();
      CreateMap<User, UserListDto>();
      CreateMap<User, UserToReturn>();
      CreateMap<MessageDto, Message> ();
    }
  }
}