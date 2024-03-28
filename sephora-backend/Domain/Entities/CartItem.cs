namespace CleanArchitecture.Domain.Entities;

/**
 * CartItem is a join table between UserEntity and ProductEntity. <br/>
 * It is used to store the products that a user has in their cart
 * and their quantities
 */
public class CartItem
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public int Quantity { get; set; }

    [ForeignKey("Users"), Column(Order = 0)]
    public string UserId { get; set; } = String.Empty;
    public UserEntity User { get; set; } = default!;

    [ForeignKey("Products"), Column(Order = 1)]
    public long ProductPieceId { get; set; }
    public ProductPiece ProductPiece { get; set; } = default!;

    public decimal? Discount { get; set; }

    public decimal? Tax { get; set; }
}
