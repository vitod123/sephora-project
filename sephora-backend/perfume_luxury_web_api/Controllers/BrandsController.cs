namespace perfume_luxury_web_api.Controllers;

[Route("[controller]"), ApiController]
public class BrandsController(IBrandService brandService) : Controller
{
    [HttpGet("all")]
    public async Task<IActionResult> Get()
        => Ok(await brandService.Get().ToListAsync());
    
    [HttpGet]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int page = 1,
        [FromQuery] int size = 10,
        [FromQuery] string? sort = null,
        [FromQuery] string? filter = null
    ) => Ok(await brandService.Get(page, size, sort, filter));

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get([FromRoute] int id)
        => Ok(await brandService.GetById(id));

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] CreateBrandDto brand)
    {
        if (!ModelState.IsValid) 
            throw new ArgumentException("The model is not valid.");

        await brandService.Create(brand);
        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        await brandService.Delete(id);
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> Edit([FromBody] BrandDto brand)
    {
        if (!ModelState.IsValid) 
            throw new ArgumentException("The model is not valid.");

        await brandService.Edit(brand);
        return Ok();
    }
}
