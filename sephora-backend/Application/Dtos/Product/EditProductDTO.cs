namespace CleanArchitecture.Application.Dtos.Product;

public class EditProductDto
{
    public long Id { get; set; }

    public string Name { get; set; } = String.Empty;

    public string DescriptionEn { get; set; } = String.Empty;

    public string DescriptionUa { get; set; } = String.Empty;

    public bool Active { get; set; }

    public int BrandId { get; set; }

    public int CategoryId { get; set; }

    public IEnumerable<CharacteristicDto> Characteristics { get; set; } = [];

    public IEnumerable<long> DeleteCharacteristics { get; set; } = [];
}
