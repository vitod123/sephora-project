namespace CleanArchitecture.Application.Dtos.ProductPiece;

public class EditProductPieceDto
{
    public long Id { get; set; }
    
    public int? InStock { get; set; }
    
    public decimal Price { get; set; }
    
    public int AmountId { get; set; }
    
    public bool IsBottledParfume { get; set; }
}
