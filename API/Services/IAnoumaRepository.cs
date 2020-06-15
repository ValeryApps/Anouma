using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;

namespace API.Services
{
    public interface IAnoumaRepository
    {
        void Add<T>(T Entity) where T : class;
        void Remove<T>(T Entity) where T : class;
        Task<PagedList<Story>> GetStories(Params param);
        Task<IEnumerable<Story>> GetMostReadStories();
        Task<Story> GetStory(string slug);
        Task<Story> GetStory(int id);
        void UpdateStory(string slug);
        Task<PagedList<Video>> GetVideos(Params param);
        Task<Video> GetVideo(int id);
        Task<Image> GetImage(int id);
        Task<IEnumerable<Image>> GetImages();
        Task<bool> SaveAll();
        Task<User> GetUser(int id);
        Task<Message> GetMessage(int id);
        Task<IEnumerable<Message>> GetMessages();
    }
}
