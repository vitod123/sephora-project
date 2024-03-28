namespace CleanArchitecture.Application.Services.Interfaces;

/**
 * <summary>
 * The role service.
 * </summary>
 */
public interface IRoleService
{
    /**
     * <summary>
     * Create a role.
     * </summary>
     * <param name="roleName">
     * The role name.
     * </param>
     */
    Task Create(string roleName);
    
    /**
     * <summary>
     * Delete a role.
     * </summary>
     * <param name="roleName">
     * The role name.
     * </param>
     */
    Task Delete(string roleName);
    
    /**
     * <summary>
     * Add a user to a role.
     * </summary>
     * <param name="userId">
     * The user ID.
     * </param>
     * <param name="roleName">
     * The role name.
     * </param>
     */
    Task AddToRole(string userId, string roleName);
    
    /**
     * <summary>
     * Remove a user from a role.
     * </summary>
     * <param name="userId">
     * The user ID.
     * </param>
     * <param name="roleName">
     * The role name.
     * </param>
     */
    Task RemoveFromRole(string userId, string roleName);
    
    /**
     * <summary>
     * Get all roles.
     * </summary>
     * <returns>
     * Collection of all roles.
     * </returns>
     */
    Task<IEnumerable<IdentityRole>> GetAll();
    
    /**
     * <summary>
     * Get all roles of a user.
     * </summary>
     * <param name="userId">
     * The user ID.
     * </param>
     * <returns>
     * Collection of all roles of a user.
     * </returns>
     */
    Task<IEnumerable<string>> GetByUserId(string userId);
}
