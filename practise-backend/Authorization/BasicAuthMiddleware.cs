using System.Net.Http.Headers;
using System.Text;

/// <summary>
/// Middleware для базовой аутентификации (Basic Authentication).
/// Перехватывает входящие HTTP-запросы и проверяет наличие заголовка Authorization.
/// </summary>
public class BasicAuthMiddleware
{
    // Делегат для следующего компонента в конвейере обработки запросов
    private readonly RequestDelegate _next;

    /// <summary>
    /// Конструктор middleware.
    /// </summary>
    /// <param name="next">Следующий делегат запроса в конвейере</param>
    public BasicAuthMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    /// <summary>
    /// Основной метод обработки HTTP-запроса.
    /// Выполняет аутентификацию пользователя на основе заголовка Authorization.
    /// </summary>
    /// <param name="context">Контекст HTTP-запроса</param>
    public async Task Invoke(HttpContext context)
    {
        // Проверяем наличие заголовка Authorization в запросе
        if (context.Request.Headers.ContainsKey("Authorization"))
        {
            // Парсим заголовок Authorization для получения схемы и параметров
            var authHeader = AuthenticationHeaderValue.Parse(context.Request.Headers["Authorization"]);
            
            // Проверяем, что параметр (закодированные учетные данные) присутствует
            if (authHeader.Parameter != null)
            {
                // Декодируем Base64 строку в байтовый массив
                var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
                
                // Преобразуем байты в строку UTF-8 и разделяем на логин и пароль
                var credentials = Encoding.UTF8.GetString(credentialBytes).Split(':', 2);
                var username = credentials[0];  // Имя пользователя
                var password = credentials[1];  // Пароль

                // Аутентифицируем пользователя, проверяя учетные данные в базе данных
                User? user;
                using (ApplicationContext db = new ApplicationContext())
                {
                    // Ищем пользователя с совпадающим логином и паролем
                    user = db.Users.FirstOrDefault(c => c.Nickname == username && c.Password == password);
                }

                // Сохраняем ID пользователя в контексте запроса для дальнейшего использования
                // (например, в атрибутах авторизации или контроллерах)
                context.Items["UserId"] = user?.Id;
            }
        }

        // Передаем управление следующему компоненту в конвейере
        await _next(context);
    }
}