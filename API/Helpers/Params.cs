namespace API.Helpers
{
  public class Params
  {
    public int PageSize { get; set; } = 5;
    public int CurrentPage { get; set; } = 1;

    public string Category { get; set; }
  }
}