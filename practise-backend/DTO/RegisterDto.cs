public class RegistrationDto
{
    public string? Nickname { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? Surname { get; set; }
    public string? Name { get; set; }
    public IFormFile? ImageFile { get; set; }
    public string? Contacts { get; set; }
    public string? UserInfo { get; set; }
    public string? Achievements { get; set; }
}