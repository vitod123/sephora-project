namespace CleanArchitecture.Domain.Entities;

[Table("Characteristics")]
public class Characteristic
{
    public long Id { get; set; }

    public long ProductId { get; set; }
    public ProductEntity Product { get; set; } = default!;

    public string NameEn { get; set; } = String.Empty;
    public string NameUa { get; set; } = String.Empty;

    public string ValueEn { get; set; } = String.Empty;
    public string ValueUa { get; set; } = String.Empty;
}
