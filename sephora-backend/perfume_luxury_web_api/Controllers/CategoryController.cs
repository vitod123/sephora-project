namespace perfume_luxury_web_api.Controllers;

[Route("[controller]"), ApiController]
public class CategoryController(ICategoryService categoryService) : Controller
{
    [HttpGet("all")]
    public async Task<IActionResult> Get()
        => Ok(await categoryService.Get().ToListAsync());

    [HttpGet]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int page = 1,
        [FromQuery] int size = 10,
        [FromQuery] string? sort = null,
        [FromQuery] string? filter = null
    ) => Ok(await categoryService.Get(page, size, sort, filter));

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get([FromRoute] int id)
        => Ok(await categoryService.GetById(id));

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromForm] CreateCategoryDto category
    )
    {
        if (!ModelState.IsValid)
            throw new ArgumentException("The model is not valid.");

        await categoryService.Create(category);
        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        await categoryService.Delete(id);
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> Edit(
        [FromForm] EditCategoryDto category
    )
    {
        if (!ModelState.IsValid)
            throw new ArgumentException("The model is not valid.");

        await categoryService.Edit(category);
        return Ok();
    }
}
