using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
  public class PagedList<T>:List<T> 
  {
    public int CurrentPage { get; set; }
    public int PageSize { get; set; }
    public int TotalItems { get; set; }
    public int TotalPages { get; set; }

    public PagedList(List<T> items, int count, int currentPage, int pageSize)
    {
      CurrentPage = currentPage;
      PageSize = pageSize;
      TotalItems = count;
      TotalPages = (int) Math.Ceiling(count / (double) pageSize);
      AddRange(items);
    }

    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int currentPage, int pageSize)
    {
      var count = await source.CountAsync();
      var items = await source.Skip((currentPage - 1) * pageSize).Take(pageSize).ToListAsync();

      return new PagedList<T>(items, count, currentPage, pageSize);
    }
  }
}