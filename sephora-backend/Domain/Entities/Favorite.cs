using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Domain.Entities;

[Table("Favorites"), PrimaryKey(nameof(UserId), nameof(ProductId))]
public class Favorite
{
    [Column(Order = 0)]
    public string UserId { get; set; } = String.Empty;
    public UserEntity User { get; set; } = default!;
    
    [Column(Order = 1)]
    public long ProductId { get; set; }
    public ProductEntity Product { get; set; } = default!;

    public bool IsActive { get; set; } = false;
}
