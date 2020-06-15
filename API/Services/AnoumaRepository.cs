using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;

namespace API.Services
{
    public class AnoumaRepository : IAnoumaRepository
    {
        private readonly DataContext _context;

        public AnoumaRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T Entity) where T : class
        {
            _context.Add(Entity);
        }

        public async Task<PagedList<Story>> GetStories(Params param)
        {
            var stories = _context.Stories.OrderByDescending(x=>x.DatePosted).AsQueryable();
            if (! string.IsNullOrEmpty(param.Category))
                stories = stories.Where(x => x.Category == param.Category);
            return await PagedList<Story>.CreateAsync(stories, param.CurrentPage, param.PageSize);
        }

        public async Task<Story> GetStory(string slug)
        {
            return await _context.Stories.FirstOrDefaultAsync(x => x.Slug == slug);
        }

        public async Task<Story> GetStory(int id)
        {
            return await _context.Stories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public void UpdateStory(string slug)
        {
            var story = _context.Stories.FirstOrDefault(x => x.Slug == slug);
            if (story != null)
            {
                _context.Stories.Update(story);
                _context.SaveChangesAsync();
            }
           
        }

        public async Task<Video> GetVideo(int id)
        {
            var video = await _context.Videos.FirstOrDefaultAsync(x => x.Id == id);
            return video;
        }

        public async Task<Image> GetImage(int id)
        {
            return await _context.Images.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Image>> GetImages()
        {
            return await _context.Images.ToListAsync();
        }

        public async Task<PagedList<Video>> GetVideos(Params param)
        {
            var videos = _context.Videos.OrderByDescending(x=>x.DatePosted).AsQueryable();
            if (string.IsNullOrEmpty(param.Category))
            {
                foreach (var video in videos)
                {
                    video.Category = param.Category;
                }
            }
            return await PagedList<Video>.CreateAsync(videos, param.CurrentPage, param.PageSize);
        }

        public void Remove<T>(T Entity) where T : class
        {
            _context.Remove(Entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Message>> GetMessages()
        {
            return await _context.Messages.ToListAsync();
        }
         public async Task<IEnumerable<Story>> GetMostReadStories()
         {
            var storires = _context.Stories.OrderByDescending(x=>x.Views).AsQueryable();
            storires = storires.Skip(0).Take(8);
            List<Story> storyList = await storires.ToListAsync();
            return storyList;
         }
    }
}
