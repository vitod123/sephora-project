namespace perfume_luxury_web_api.Controllers;

[Authorize, ApiController, Route("[controller]")]
public class CartController(ICartService cartService) : ControllerBase
{
    [HttpGet("all"), Authorize]
    public async Task<IActionResult> Get()
        => Ok(await cartService.Get(User).ToListAsync());
    
    [HttpGet, Authorize]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int page = 1,
        [FromQuery] int size = 10,
        [FromQuery] string? sort = null,
        [FromQuery] string? filter = null
    ) => Ok(await cartService.Get(User, page, size, sort, filter));

    [HttpGet("{id:long}"), Authorize(Roles = "SudoAdmin,Admin")]
    public async Task<IActionResult> Get([FromRoute] long id)
        => Ok(await cartService.GetById(id));
    
    [HttpGet("contains/{id:long}"), Authorize]
    public async Task<IActionResult> Contains([FromRoute] long id)
        => Ok(await cartService.Exists(id));

    [HttpPost, Authorize]
    public async Task<IActionResult> Add([FromBody] CreateCartDto cartItem)
    {
        if (!ModelState.IsValid) 
            throw new ArgumentException("The model is not valid.");

        await cartService.Create(cartItem, User);
        return Ok();
    }
    
    [HttpPut, Authorize]
    public async Task<IActionResult> Update([FromBody] UpdateCartDto cartItem)
    {
        if (!ModelState.IsValid) 
            throw new ArgumentException("The model is not valid.");

        await cartService.Update(cartItem, User);
        return Ok();
    }

    [HttpDelete("{id:long}"), Authorize]
    public async Task<IActionResult> Remove([FromRoute] long id)
    {
        await cartService.Delete(id, User);
        return Ok();
    }
}
