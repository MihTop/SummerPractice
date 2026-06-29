using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class NewsController : ControllerBase
{
    // GET: /News - получить все посты
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

    // GET: /News/{id} - получить пост по id
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        using (ApplicationContext db = new ApplicationContext())
        {
            var post = db.Posts
                .Include(p => p.Author)
                .FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound(new { message = "Пост не найден" });
            }

            var postDto = new PostDto
            {
                Text = post.Text,
                Author = post.Author != null ? post.Author.Nickname : null,
                AuthorPhoto = post.Author != null ? post.Author.Image : null,
                Photo = post.Photo,
                PublishDateTime = post.PublishDateTime
            };

            return Ok(postDto);
        }
    }

    // POST: /News - создать новый пост
    [HttpPost]
    public IActionResult Post([FromForm] AddPostDto addPostRequest)
    {
        if (string.IsNullOrWhiteSpace(addPostRequest.Text) && string.IsNullOrWhiteSpace(addPostRequest.Photo))
        {
            return BadRequest(new { message = "Заполните текст или добавьте изображение" });
        }

        using (ApplicationContext db = new ApplicationContext())
        {
            // Проверяем, существует ли пользователь
            var user = db.Users.FirstOrDefault(u => u.Nickname == addPostRequest.Author);
            if (user == null)
            {
                return BadRequest(new { message = "Пользователь не найден" });
            }

            // Создаем новый пост
            Post newPost = new Post
            {
                Text = addPostRequest.Text,
                UserId = user.Id,
                Author = user,
                Photo = addPostRequest.Photo,
                PublishDateTime = DateTime.Now
            };

            db.Posts.Add(newPost);
            db.SaveChanges();

            return Ok(new { message = "Пост успешно создан", postId = newPost.Id });
        }
    }

    // DELETE: /News/{id} - удалить пост
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        using (ApplicationContext db = new ApplicationContext())
        {
            var post = db.Posts.FirstOrDefault(p => p.Id == id);
            if (post == null)
            {
                return NotFound(new { message = "Пост не найден" });
            }

            db.Posts.Remove(post);
            db.SaveChanges();

            return Ok(new { message = "Пост успешно удален" });
        }
    }
}