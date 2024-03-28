namespace CleanArchitecture.Application.Dtos.Rating;

public class CreateRatingDto
{
    public long ProductId { get; set; }
    public decimal Rate { get; set; } // 1 to 5
    public string? Comment { get; set; }
    
    // The user will be registered in the backend
}
