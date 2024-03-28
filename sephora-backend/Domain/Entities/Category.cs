namespace CleanArchitecture.Domain.Entities;

public class Category
{
    public int Id { get; set; }

    public string NameEn { get; set; } = String.Empty;

    public string NameUa { get; set; } = String.Empty;

    public string DescriptionEn { get; set; } = String.Empty;

    public string DescriptionUa { get; set; } = String.Empty;

    public string Picture { get; set; } = String.Empty;

    public ICollection<ProductEntity> Products { get; set; } = [];
}
