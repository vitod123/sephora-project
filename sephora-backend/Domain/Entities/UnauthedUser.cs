namespace CleanArchitecture.Domain.Entities;

public class UnauthedUser
{
    public long Id { get; set; }
    
    public string FirstName { get; set; } = String.Empty;
    
    public string LastName { get; set; } = String.Empty;

    public string PhoneNumber { get; set; } = String.Empty;

    public string Email { get; set; } = String.Empty;
    
    public long? DeliveryDataId { get; set; }

    public DeliveryEntity DeliveryData { get; set; } = default!;
    
    public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;
}
