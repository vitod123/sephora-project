namespace CleanArchitecture.Domain.Entities;

public class Amount
{
    public int Id { get; set; }
    public int Milliliters { get; set; }
    public ICollection<ProductPiece> ProductPieces { get; set; } = [];
}
