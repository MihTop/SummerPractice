using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class NewsFeedController : ControllerBase
{
    // GET: /NewsFeed - получить все посты
    [HttpGet]
    public IActionResult Get()
    {
        using (ApplicationContext db = new ApplicationContext())
        {
            var posts = db.Posts
                .Include(p => p.Author)
                .OrderByDescending(p => p.PublishDateTime)
                .Select(p => new PostDto
                {
                    Text = p.Text,
                    Author = p.Author != null ? p.Author.Nickname : null,
                    AuthorPhoto = p.Author != null ? p.Author.Image : null,
                    Photo = p.Photo,
                    PublishDateTime = p.PublishDateTime
                })
                .ToList();

            return Ok(posts);
        }
    }

    // POST: /NewsFeed - создать новый пост
    [HttpPost]
    [Authorize] 
    public IActionResult Post([FromForm] AddPostDto addPostRequest)
    {

        using (ApplicationContext db = new ApplicationContext())
        {
            // Проверяем существование пользователя
            var user = db.Users.FirstOrDefault(u => u.Id == addPostRequest.UserId);
            if (user == null)
            {
                return BadRequest(new { message = "Пользователь не найден" });
            }

            // Сохраняем изображение, если оно есть
            string fileName = null;
            if (addPostRequest.Photo != null && addPostRequest.Photo.Length > 0)
            {
                fileName = ImageSaveHelper.SaveImage(addPostRequest.Photo);
            }

            // Создаем новый пост
            Post newPost = new Post
            {
                Text = addPostRequest.Text,
                UserId = addPostRequest.UserId,
                Author = user,
                Photo = fileName,
                PublishDateTime = DateTime.Now
            };

            db.Posts.Add(newPost);
            db.SaveChanges();

            return Ok(new { message = "Пост успешно создан", postId = newPost.id });
        }
    }
}