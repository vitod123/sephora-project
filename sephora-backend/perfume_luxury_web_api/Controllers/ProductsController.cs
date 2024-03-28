namespace perfume_luxury_web_api.Controllers;

[Route("[controller]"), ApiController]
public class ProductsController(IProductService productService) : Controller
{
    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
        => Ok(await productService.Get(User));

    [HttpGet]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int page = 1,
        [FromQuery] int size = 10,
        [FromQuery] string? sort = null,
        [FromQuery] string? filter = null
    ) => Ok(await productService.Get(page, size, sort, filter, User));

    [HttpGet("{id:long}")]
    public async Task<IActionResult> Get([FromRoute] long id)
        => Ok(await productService.GetById(id, User));

    [HttpPost, Authorize(Roles = "SudoAdmin,Admin")]
    public async Task<IActionResult> Create([FromBody] CreateProductDto product)
    {
        if (!ModelState.IsValid)
            throw new ArgumentException("The model is not valid.");

        var productdto = await productService.Create(product);
        return Ok(productdto);
    }

    [HttpDelete("{id:long}"), Authorize(Roles = "SudoAdmin,Admin")]
    public async Task<IActionResult> Delete([FromRoute] long id)
    {
        await productService.Delete(id);
        return Ok();
    }

    [HttpPut, Authorize(Roles = "SudoAdmin,Admin")]
    public async Task<IActionResult> Edit([FromBody] EditProductDto product)
    {
        if (!ModelState.IsValid)
            throw new ArgumentException("The model is not valid.");

        await productService.Edit(product);
        return Ok();
    }
}
