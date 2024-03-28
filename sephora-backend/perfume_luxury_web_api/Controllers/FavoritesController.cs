namespace perfume_luxury_web_api.Controllers;

[Route("[controller]"), ApiController, Authorize]
public class FavoritesController(
    IFavoritesService favoritesService
) : ControllerBase
{
    [HttpPut("{productId:long}")]
    public async Task<IActionResult> Change([FromRoute] long productId)
    {
        await favoritesService.ChangeFavoriteStatus(User, productId);
        return Ok();
    }
    
    [HttpGet("isFavorite/{productId:long}")]
    public async Task<IActionResult> IsFavorite([FromRoute] long productId)
        => Ok(await favoritesService.IsFavorite(User, productId));

    [HttpGet("all")]
    public async Task<IActionResult> Get()
        => Ok(await favoritesService.Get(User));
    
    [HttpGet]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int page = 1,
        [FromQuery] int size = 10,
        [FromQuery] string? sort = null,
        [FromQuery] string? filter = null
    ) => Ok(await favoritesService.Get(User, page, size, sort, filter));
}
