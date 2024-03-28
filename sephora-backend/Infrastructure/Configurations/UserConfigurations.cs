namespace Infrastructure.Configurations;

public class UserConfigurations : IEntityTypeConfiguration<UserEntity>
{
    public void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        // builder
        //     .HasMany(u => u.Orders)
        //     .WithOne(a => a.User)
        //     .HasForeignKey(a => a.UserId)
        //     .OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(u => u.DeliveryData)
            .WithOne(d => d.User)
            .HasForeignKey<UserEntity>(u => u.DeliveryDataId)
            .OnDelete(DeleteBehavior.Cascade);
        builder
            .HasMany(user => user.Ratings)
            .WithOne(rat => rat.User)
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
