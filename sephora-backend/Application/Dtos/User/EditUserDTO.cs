namespace CleanArchitecture.Application.Dtos.User;

public class EditUserDto
{
    public string UserName { get; set; } = String.Empty;
    public string Email { get; set; } = String.Empty;
    public string PhoneNumber { get; set; } = String.Empty;
    public IFormFile? ProfilePicture { get; set; }
}
