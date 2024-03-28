namespace CleanArchitecture.Domain.Entities;

public class UserEntity : IdentityUser
{
    public string FirstName { get; set; } = String.Empty;
    
    public string LastName { get; set; } = String.Empty;
    
    public string? ProfilePicture { get; set; }

    public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;

    public long? DeliveryDataId { get; set; }

    public DeliveryEntity? DeliveryData { get; set; }

    public ICollection<Rating> Ratings { get; set; } = [];

    public ICollection<Order> Orders { get; set; } = [];

    public ICollection<CartItem> CartItems { get; set; } = [];

    public ICollection<Favorite> Favorites { get; set; } = [];
}
