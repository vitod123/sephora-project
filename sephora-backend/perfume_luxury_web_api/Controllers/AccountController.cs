namespace perfume_luxury_web_api.Controllers;

[Route("[controller]"), ApiController]
public class AccountController(
    IAccountsService accountsService,
    UserManager<UserEntity> userManager
) : ControllerBase
{
    [HttpGet("all"), Authorize(Roles = "SudoAdmin")]
    public async Task<IActionResult> Get()
        => Ok(await accountsService.Get().ToListAsync());

    [HttpGet, Authorize(Roles = "SudoAdmin")]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int page = 1,
        [FromQuery] int size = 10,
        [FromQuery] string? sort = null,
        [FromQuery] string? filter = null
    ) => Ok(await accountsService.Get(page, size, sort, filter));

    [HttpGet("get/{id}"), Authorize(Roles = "SudoAdmin")]
    public async Task<IActionResult> Get(string id)
        => Ok(await accountsService.Get(id));

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromForm] RegisterDto dto)
    {
        if (!ModelState.IsValid)
            throw new ArgumentException("The model is not valid.");

        await accountsService.Register(dto);
        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        if (!ModelState.IsValid)
            throw new ArgumentException("The model is not valid.");

        var response = await accountsService.Login(dto);
        return Ok(response);
    }

    [HttpPost("auth/google"), AllowAnonymous]
    public async Task<IActionResult> GoogleAuth([FromBody] string gToken)
    {
        var payload = await accountsService.GoogleAuth(gToken);
        return Ok(payload);
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await accountsService.Logout();
        return Ok();
    }

    [HttpDelete("{id}"), Authorize(Roles = "SudoAdmin")]
    public async Task<IActionResult> Delete([FromRoute] string id)
    {
        await accountsService.Delete(id);
        return Ok();
    }

    [HttpPut("{id}"), Authorize(Roles = "SudoAdmin")]
    public async Task<IActionResult> Edit(
        string id,
        [FromForm] EditUserDto user
    )
    {
        if (!ModelState.IsValid)
            throw new ArgumentException("The model is not valid.");

        await accountsService.Edit(id, user);
        return Ok();
    }

    [HttpGet("profile"), Authorize]
    public async Task<IActionResult> GetMy()
        => Ok(await accountsService.Get(
            userManager.GetUserId(User) ?? String.Empty
        ));

    [HttpDelete("profile"), Authorize]
    public async Task<IActionResult> DeleteMy()
    {
        await accountsService.Delete(
            userManager.GetUserId(User) ?? String.Empty
        );
        return Ok();
    }

    [HttpPut("profile"), Authorize]
    public async Task<IActionResult> EditMy([FromForm] EditUserDto user)
    {
        if (!ModelState.IsValid)
            throw new ArgumentException("The model is not valid.");

        await accountsService.Edit(
            userManager.GetUserId(User) ?? String.Empty,
            user
        );
        return Ok();
    }

    [HttpGet("checkUsernameExists/{userName}")]
    public async Task<IActionResult> CheckUsernameExists(
        [FromRoute] string userName
    ) => Ok(await accountsService.CheckUsernameExists(userName));

    [HttpGet("checkEmailExists/{email}")]
    public async Task<IActionResult> CheckEmailExists([FromRoute] string email)
        => Ok(await accountsService.CheckEmailExists(email));
}
