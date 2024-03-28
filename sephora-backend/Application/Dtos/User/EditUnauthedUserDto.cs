namespace CleanArchitecture.Application.Dtos.User;

public class EditUnauthedUserDto
{
    public long Id { get; set; }
    
    public string FirstName { get; set; } = String.Empty;

    public string LastName { get; set; } = String.Empty;

    public string PhoneNumber { get; set; } = String.Empty;

    public string Email { get; set; } = String.Empty;

    public long? DeliveryDataId { get; set; }
}
