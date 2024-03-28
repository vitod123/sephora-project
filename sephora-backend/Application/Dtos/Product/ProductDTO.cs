namespace CleanArchitecture.Application.Dtos.Product;

public class ProductDto
{
    public long Id { get; set; }

    public string Name { get; set; } = String.Empty;

    public string DescriptionEn { get; set; } = String.Empty;

    public string DescriptionUa { get; set; } = String.Empty;

    public bool Active { get; set; }

    public BrandDto Brand { get; set; } = default!;

    public CategoryDto Category { get; set; } = default!;

    public IEnumerable<ProductPieceDto> Pieces { get; set; } = [];

    public IEnumerable<RatingDto> Ratings { get; set; } = [];

    public decimal AverageRating { get; set; }

    public IEnumerable<AmountDto> Volumes { get; set; } = [];

    public IEnumerable<CharacteristicDto> Characteristics { get; set; } = [];

    public DateTime CreatedAt { get; set; }

    // Publication was less than 14 days ago
    public bool IsNew => CreatedAt > DateTime.UtcNow.AddDays(-14);

    public bool IsFavorite { get; set; }
}
