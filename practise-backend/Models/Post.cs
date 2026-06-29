using System.ComponentModel.DataAnnotations.Schema;
public class Post{
    public int id {get; set;}
    public string? Text {get;set;}
    public int? UserId {get; set;}
    [ForeignKey("UserId")]
    public User? Author{get; set;}
    public string? Photo{get;set;}
    public DateTime PublishDateTime{get;set;}
}