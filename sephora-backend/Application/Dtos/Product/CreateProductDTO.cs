namespace CleanArchitecture.Application.Dtos.Product;

public class CreateProductDto
{
    public string Name { get; set; } = String.Empty;
    public string DescriptionEn { get; set; } = String.Empty;
    public string DescriptionUa { get; set; } = String.Empty;
    public bool Active { get; set; }
    public int BrandId { get; set; }
    public int CategoryId { get; set; }
    public IEnumerable<CreateCharacteristicDto> Characteristics { get; set; } = [];
}
