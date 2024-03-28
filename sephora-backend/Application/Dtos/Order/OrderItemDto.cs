namespace CleanArchitecture.Application.Dtos.Order;

public class OrderItemDto
{
    public long Id { get; set; }
    public ProductPieceDto ProductPiece { get; set; } = default!;
    public int Quantity { get; set; }
    public long OrderId { get; set; }
}
