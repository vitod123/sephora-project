namespace CleanArchitecture.Application.Dtos.ProductPiece;

public class CreateProductPieceDto
{
    public long ProductId { get; set; }
    public int? InStock { get; set; }
    public decimal Price { get; set; }
    public int AmountId { get; set; }
    public bool IsBottledParfume { get; set; }
    public IEnumerable<IFormFile> ProductPictures { get; set; } = [];
}
