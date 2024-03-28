namespace CleanArchitecture.Application.Dtos.User;

public class UnauthedUserDto
{
    public long Id { get; set; }
    
    public string UserName { get; set; } = String.Empty;

    public string PhoneNumber { get; set; } = String.Empty;

    public string Email { get; set; } = String.Empty;

    public DeliveryDto DeliveryData { get; set; } = default!;
}
