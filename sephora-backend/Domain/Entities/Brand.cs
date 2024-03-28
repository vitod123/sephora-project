namespace CleanArchitecture.Domain.Entities;

public class Brand
{
    public int Id { get; set; }

    public string Name { get; set; } = String.Empty;

    public ICollection<ProductEntity> Products { get; set; } = [];
}
