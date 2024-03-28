namespace CleanArchitecture.Application.Dtos.User;

public class GetUserDto
{
    public string Id { get; set; } = String.Empty;

    public string FirstName { get; set; } = String.Empty;

    public string LastName { get; set; } = String.Empty;

    public string Email { get; set; } = String.Empty;

    public PictureDto? ProfilePicture { get; set; }

    public string? PhoneNumber { get; set; }

    public List<string> Roles { get; set; } = [];

    public DateTime RegistrationDate { get; set; }

    public ICollection<RatingDto> Ratings { get; set; } = [];

    public ICollection<OrderDto> Orders { get; set; } = [];
    
    public ICollection<CartDto> CartItems { get; set; } = [];
}
