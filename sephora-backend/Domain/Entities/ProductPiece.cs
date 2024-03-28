namespace CleanArchitecture.Domain.Entities;

public class ProductPiece
{
    public long Id { get; set; }

    public int? InStock { get; set; }

    public decimal Price { get; set; }

    public int? AmountId { get; set; }

    public Amount? Amount { get; set; }

    public bool IsBottledParfume { get; set; }

    public long ProductId { get; set; }

    public ProductEntity Product { get; set; } = default!;
    
    public ICollection<ProductPicture> ProductPictures { get; set; } = [];
    
    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
