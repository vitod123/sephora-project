namespace perfume_luxury_web_api.Controllers;

[ApiController, Route("[controller]")]
public class RatingController(IRatingService ratingService) : ControllerBase
{
    [HttpGet("all")]
    public async Task<IActionResult> Get()
        => Ok(await ratingService.Get().ToListAsync());

    [HttpGet]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int page = 1,
        [FromQuery] int size = 10,
        [FromQuery] string? sort = null,
        [FromQuery] string? filter = null
    )
    {
        var ratings = await ratingService.Get(page, size, sort, filter);
        return Ok(ratings);
    }

    [HttpGet("product/{id:long}")]
    public async Task<IActionResult> GetByProduct(
        [FromRoute] long id,
        [FromQuery] int page = 1,
        [FromQuery] int size = 10,
        [FromQuery] string? sort = null,
        [FromQuery] string? filter = null
    ) => await GetPaged(
        page,
        size,
        sort,
        filter is null
            ? $"Id = {id}"
            : $"{filter} and Id = {id}"
    );

    [HttpGet("{id:long}")]
    public async Task<IActionResult> GetById(long id)
    {
        var rating = await ratingService.GetById(id);
        if (rating is null)
            throw new HttpException(
                $"The rating with ID={{{id}}} was not found",
                HttpStatusCode.NotFound
            );
        return Ok(rating);
    }

    [HttpPost, Authorize]
    public async Task<IActionResult> Create(CreateRatingDto createRatingDto)
    {
        if (!ModelState.IsValid)
            throw new ArgumentException("The model is not valid.");

        await ratingService.Create(createRatingDto, User);
        return Ok();
    }

    [HttpPut, Authorize]
    public async Task<IActionResult> Edit(EditRatingDto editRatingDto)
    {
        if (!ModelState.IsValid)
            throw new ArgumentException("The model is not valid.");

        await ratingService.Edit(editRatingDto, User);
        return Ok();
    }

    [HttpDelete("{id:long}"), Authorize]
    public async Task<IActionResult> Delete(long id)
    {
        await ratingService.Delete(id, User);
        return Ok();
    }
}
