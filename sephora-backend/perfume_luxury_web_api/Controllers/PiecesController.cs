namespace perfume_luxury_web_api.Controllers;

[ApiController, Route("[controller]")]
public class PiecesController(
    IPieceService pieceService
) : ControllerBase
{
    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        var items = await pieceService.Get(User);
        return Ok(items);
    }

    [HttpGet]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int page = 1,
        [FromQuery] int size = 10,
        [FromQuery] string? sort = null,
        [FromQuery] string? filter = null
    )
    {
        var items = await pieceService.Get(page, size, sort, filter, User);
        return Ok(items);
    }

    [HttpGet("{id:long}")]
    public async Task<IActionResult> GetById(long id)
        => Ok(await pieceService.GetById(id, User));

    [HttpPost, Authorize(Roles = "SudoAdmin,Admin")]
    public async Task<IActionResult> Create(
        [FromForm] CreateProductPieceDto dto
    )
    {
        if (!ModelState.IsValid) 
            throw new ArgumentException("The model is not valid.");

        await pieceService.Create(dto);
        return Ok();
    }
    
    [HttpPost("add-pictures"), Authorize(Roles = "SudoAdmin,Admin")]
    public async Task<IActionResult> AddPictures(
        [FromForm] AddPiecePicturesDto dto
    )
    {
        await pieceService.SavePictures(dto.Pictures, dto.PieceId);
        return Ok();
    }
    
    [HttpPost("delete-pictures"), Authorize(Roles="SudoAdmin,Admin")]
    public async Task<IActionResult> DeletePictures(
        [FromBody] DeletePiecePicturesDto dto
    )
    {
        await pieceService.DeletePictures(dto);
        return Ok();
    }

    [HttpPut, Authorize(Roles = "SudoAdmin,Admin")]
    public async Task<IActionResult> Update(
        [FromForm] EditProductPieceDto dto
    )
    {
        if (!ModelState.IsValid) 
            throw new ArgumentException("The model is not valid.");

        await pieceService.Edit(dto);
        return Ok();
    }

    [HttpDelete("{id:long}"), Authorize(Roles = "SudoAdmin,Admin")]
    public async Task<IActionResult> Delete(long id)
    {
        await pieceService.Delete(id);
        return Ok();
    }
}
