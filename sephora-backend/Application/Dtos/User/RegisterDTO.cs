namespace CleanArchitecture.Application.Dtos.User;

public class RegisterDto
{
    public string UserName { get; set; } = String.Empty;

    public string FirstName { get; set; } = String.Empty;
    
    public string LastName { get; set; } = String.Empty;
    
    public string Email { get; set; } = String.Empty;

    public string? PhoneNumber { get; set; }

    public string Password { get; set; } = String.Empty; 

    public string PasswordConfirmation { get; set; } = String.Empty;

    public IFormFile? ProfilePicture { get; set; }

    //[EnumDataType(typeof(Gender))]
    //public Gender Gender { get; set; }

}
//public enum Gender
//{
//    Male = 1,
//    Female = 2
//}
