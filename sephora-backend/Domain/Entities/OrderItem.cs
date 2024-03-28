namespace CleanArchitecture.Domain.Entities;

public class OrderItem
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public int Quantity { get; set; }
    
    [ForeignKey("Products"), Column(Order = 1)]
    public long ProductPieceId { get; set; }
    public ProductPiece ProductPiece { get; set; } = default!;
    
    [ForeignKey("Orders"), Column(Order = 2)]
    public long OrderId { get; set; }
    public Order Order { get; set; } = default!;
}
