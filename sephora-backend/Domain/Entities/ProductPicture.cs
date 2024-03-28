namespace CleanArchitecture.Domain.Entities;

public class ProductPicture
{
    public long Id { get; set; }
    public string PicturePath { get; set; } = String.Empty;
    
    public long ProductPieceId { get; set; }
    public ProductPiece ProductPiece { get; set; } = null!;
}
