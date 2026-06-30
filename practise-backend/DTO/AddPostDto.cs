public class AddPostDto
{
    public string? Text { get; set; }
    public int UserId { get; set; }
    public IFormFile? Photo { get; set; }
}