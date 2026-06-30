/// <summary>
/// Хелпер класс для работы с изображениями.
/// </summary>
public class ImageSaveHelper
{
    /// <summary>
    /// Сохраняет изображение и возвращает новое имя картинки.
    /// </summary>
    /// <param name="image"></param>
    /// <returns></returns>
    public static string SaveImage(IFormFile image)
    {
        try
        {
            // Получаем путь к папке wwwroot/img
            string path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "wwwroot", "images"));
            
            // Создаем папку, если её нет
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            // Получаем расширение файла
            string ext = Path.GetExtension(image.FileName);
            
            // Если расширение пустое, добавляем .jpg по умолчанию
            if (string.IsNullOrEmpty(ext))
            {
                ext = ".jpg";
            }

            // Генерируем уникальное имя файла
            string newName = Guid.NewGuid().ToString() + ext;
            
            // Полный путь к файлу
            string fullPath = Path.Combine(path, newName);

            // Сохраняем файл
            using (var fileStream = new FileStream(fullPath, FileMode.Create))
            {
                image.CopyTo(fileStream);
            }

            return newName;
        }
        catch (Exception ex)
        {
            throw new Exception($"Ошибка при сохранении изображения: {ex.Message}");
        }
    }
}