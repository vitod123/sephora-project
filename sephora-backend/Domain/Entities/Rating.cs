namespace CleanArchitecture.Domain.Entities;

public class Rating
{
    public long Id { get; set; }

    public string UserId { get; set; } = String.Empty;
    public UserEntity User { get; set; } = default!;

    public long ProductId { get; set; } 
    public ProductEntity Product { get; set; } = default!;

    public decimal Rate { get; set; }

    public string? Comment { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
