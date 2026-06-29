using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class RegisterController : ControllerBase
{
    [HttpPost]
    public IActionResult Post([FromForm] RegistrationDto registrationRequest)
    {
        using (ApplicationContext db = new ApplicationContext())
        {
            
            var existingUserByNickname = db.Users.FirstOrDefault(u => u.Nickname == registrationRequest.Nickname);
            if (existingUserByNickname != null)
            {
                return BadRequest(new { message = "Такой псевдоним уже занят" });
            }

            // Проверка, что почта не занята
            var existingUserByEmail = db.Users.FirstOrDefault(u => u.Email == registrationRequest.Email);
            if (existingUserByEmail != null)
            {
                return BadRequest(new { message = "Такая почта уже зарегистрирована" });
            }

            // Создание нового пользователя
            User newUser = new User
            {
                Nickname = registrationRequest.Nickname,
                Email = registrationRequest.Email,
                Password = registrationRequest.Password,
                Surname = registrationRequest.Surname,
                Name = registrationRequest.Name,
                Image = registrationRequest.ImageFile,
                Contacts = registrationRequest.Contacts,
                UserInfo = registrationRequest.UserInfo,
                Achievements = registrationRequest.Achievements
            };

            db.Users.Add(newUser);
            db.SaveChanges();

            return Ok(newUser);
        }
    }
}