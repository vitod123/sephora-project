namespace CleanArchitecture.Application.Dtos.ProductPiece;

public class LightProductPieceDto
{
    public long Id { get; set; }
    
    public int? InStock { get; set; }
    
    public decimal Price { get; set; }
    
    public int Milliliters { get; set; }
    
    public bool IsBottledParfume { get; set; }
    
    public LightProductDto Product { get; set; } = default!;
    
    public IEnumerable<PictureDto> Pictures { get; set; } = [];
    
    public DateTime CreatedAt { get; set; }
    
    // Publication was less than 14 days ago
    public bool IsNew => CreatedAt > DateTime.UtcNow.AddDays(-14);
}
