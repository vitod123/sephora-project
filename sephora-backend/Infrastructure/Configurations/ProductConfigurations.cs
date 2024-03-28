namespace Infrastructure.Configurations;

public class ProductConfigurations : IEntityTypeConfiguration<ProductEntity>
{
    public void Configure(EntityTypeBuilder<ProductEntity> builder)
    {
        builder
            .HasMany(p => p.Ratings)
            .WithOne(rat => rat.Product)
            .HasForeignKey(a => a.ProductId);
        builder
            .HasOne(p => p.Brand)
            .WithMany(b => b.Products)
            .HasForeignKey(p => p.BrandId);
        builder
            .HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId);
        builder
            .HasMany(p => p.ProductPieces)
            .WithOne(pp => pp.Product)
            .HasForeignKey(pp => pp.ProductId);
    }
}
