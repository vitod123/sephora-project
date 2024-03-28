namespace perfume_luxury_web_api.Controllers;

[Route("[controller]"), ApiController]
public class RoleController(IRoleService roleService) : ControllerBase
{
    [HttpPost, Authorize(Roles = "SudoAdmin")]
    public async Task<IActionResult> Create([FromBody] string roleName)
    {
        await roleService.Create(roleName);
        return Ok();
    }
    
    [HttpPost("addToRole"), Authorize(Roles = "SudoAdmin")]
    public async Task<IActionResult> AddToRole(string userId, string roleName)
    {
        await roleService.AddToRole(userId, roleName);
        return Ok();
    }
    
    [HttpPost("removeFromRole")]
    public async Task<IActionResult> RemoveFromRole(string userId, string roleName)
    {
        await roleService.RemoveFromRole(userId, roleName);
        return Ok();
    }
    
    [HttpDelete("{roleName}"), Authorize(Roles = "SudoAdmin")]
    public async Task<IActionResult> Delete([FromRoute] string roleName)
    {
        await roleService.Delete(roleName);
        return Ok();
    }
    
    [HttpGet("getByUserId/{userId}")]
    public async Task<IActionResult> GetByUserId([FromRoute] string userId)
        => Ok(await roleService.GetByUserId(userId));
    
    [HttpGet("all")]
    public async Task<IActionResult> Get()
        => Ok(await roleService.GetAll());
}
