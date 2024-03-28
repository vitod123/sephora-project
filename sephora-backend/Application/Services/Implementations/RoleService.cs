namespace CleanArchitecture.Application.Services.Implementations;

public class RoleService(
    RoleManager<IdentityRole> roleManager,
    UserManager<UserEntity> userManager
) : IRoleService
{
    public async Task Create(string roleName)
    {
        if (await roleManager.RoleExistsAsync(roleName)) return;

        var role = new IdentityRole(roleName);
        await roleManager.CreateAsync(role);
    }

    public async Task Delete(string roleName)
    {
        var role = await roleManager.FindByNameAsync(roleName);
        if (role is null) return;

        var usersInRole = await userManager.GetUsersInRoleAsync(
            role.Name ?? throw new HttpException(
                "Role not found", HttpStatusCode.NotFound)
        );
        foreach (var user in usersInRole)
            await userManager.RemoveFromRoleAsync(user, role.Name);

        await roleManager.DeleteAsync(role);
    }

    public async Task AddToRole(string userId, string roleName)
    {
        var user = await userManager.FindByIdAsync(userId);
        if (user is null) return;
        await userManager.AddToRoleAsync(user, roleName);
    }

    public async Task RemoveFromRole(string userId, string roleName)
    {
        var user = await userManager.FindByIdAsync(userId);
        if (user is null) return;
        await userManager.RemoveFromRoleAsync(user, roleName);
    }

    public async Task<IEnumerable<IdentityRole>> GetAll()
        => await roleManager.Roles.ToListAsync();

    public async Task<IEnumerable<string>> GetByUserId(string userId)
    {
        var user = await userManager.FindByIdAsync(userId);
        if (user is null)
            throw new HttpException(
                ErrorMessages.UserByIDNotFound,
                HttpStatusCode.NotFound
            );

        var roles = await userManager.GetRolesAsync(user);
        return roles;
    }
}
