namespace CleanArchitecture.Application.Dtos.Rating;

public record EditRatingDto{
    public long Id { get; set; }
    public decimal Rate { get; set; } // 1 to 5
    public string? Comment { get; set; }

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    // The user and product will be registered in the backend
}
