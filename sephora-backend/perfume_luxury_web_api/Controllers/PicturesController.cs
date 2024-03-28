namespace perfume_luxury_web_api.Controllers;

[ApiController, Route("assets/img")]
public class PicturesController(
    IPictureService pictureService,
    IHostEnvironment env
) : ControllerBase
{
    [HttpPost, Authorize(Roles = "SudoAdmin,Admin")]
    public async Task<IActionResult> SaveImage(IFormFile file)
    {
        string picName = await pictureService.SaveImage(file);
        return Ok(new PictureDto(picName, env.IsDevelopment()));
    }

    [HttpGet("{name}")]
    public IActionResult GetImage(
        [FromRoute] string name,
        [FromQuery] string size = "original"
    )
    {
        if (!pictureService.SizeExists(size))
            throw new HttpException("Invalid size", HttpStatusCode.NotFound);
        if (!pictureService.FileExists(name))
            throw new HttpException("Image not found", HttpStatusCode.NotFound);

        return File(pictureService.GetFile(name, size), "image/webp");
    }

    // may be FromBody|FromQuery
    [HttpDelete("{name}"), Authorize(Roles = "SudoAdmin,Admin")]
    public IActionResult DeleteImage([FromRoute] string name)
    {
        if (!pictureService.FileExists(name))
            throw new HttpException("Image not found", HttpStatusCode.NotFound);
        
        pictureService.DeleteFile(name);
        return Ok(new
        {
            Status = "200 OK",
            Message = "Image deleted"
        });
    }
}
