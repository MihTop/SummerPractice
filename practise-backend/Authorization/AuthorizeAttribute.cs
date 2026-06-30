using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

/// <summary>
/// Атрибут для авторизации контроллеров и методов.
/// Проверяет, авторизован ли пользователь перед выполнением действия.
/// </summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeAttribute : Attribute, IAuthorizationFilter
{
    /// <summary>
    /// Метод вызывается перед выполнением действия контроллера.
    /// </summary>
    /// <param name="context">Контекст авторизации</param>
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        // Получаем ID пользователя из контекста запроса
        // (установлен в BasicAuthMiddleware)
        var userId = (int?)context.HttpContext.Items["UserId"];

        // Если пользователь не авторизован (UserId == null)
        if (userId == null)
        {
            // Возвращаем статус 401 Unauthorized
            context.Result = new JsonResult(new { message = "Unauthorized" }) 
            { 
                StatusCode = StatusCodes.Status401Unauthorized 
            };
        }
    }
}