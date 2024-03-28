namespace CleanArchitecture.Application.Dtos.Category;

public class CreateCategoryDto
{
    public string NameEn { get; set; } = String.Empty;
    
    public string NameUa { get; set; } = String.Empty;
    
    public string DescriptionEn { get; set; } = String.Empty;
    
    public string DescriptionUa { get; set; } = String.Empty;

    public IFormFile Picture { get; set; } = default!;
}
