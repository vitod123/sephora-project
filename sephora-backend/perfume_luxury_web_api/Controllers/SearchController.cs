namespace perfume_luxury_web_api.Controllers;

[Route("[controller]"), ApiController]
public class SearchController(
    ISearchService<ProductEntity, ProductDto> searchService
) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> ExecuteSearch(
        [FromQuery] string q,
        [FromQuery] int page = 1,
        [FromQuery] int size = 10
    ) => Ok(await searchService.Search(q, page, size));
}
