namespace perfume_luxury_web_api.Controllers;

[Route("[controller]"), ApiController]
public class AmountsController(IAmountService amountService) : Controller
{
    [HttpGet("all")]
    public async Task<IActionResult> Get()
        => Ok(await amountService.Get().ToListAsync());
    
    [HttpGet]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int page = 1,
        [FromQuery] int size = 10,
        [FromQuery] string? sort = null,
        [FromQuery] string? filter = null
    ) => Ok(await amountService.Get(page, size, sort, filter));

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get([FromRoute] int id)
        => Ok(await amountService.GetById(id));

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] CreateAmountDto amount)
    {
        if (!ModelState.IsValid) 
            throw new ArgumentException("The model is not valid.");

        await amountService.Create(amount);
        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        await amountService.Delete(id);
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> Edit([FromBody] AmountDto amount)
    {
        if (!ModelState.IsValid) 
            throw new ArgumentException("The model is not valid.");

        await amountService.Edit(amount);
        return Ok();
    }
}
