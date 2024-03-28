namespace CleanArchitecture.Application.Services.Interfaces;

/**
 * <summary>
 * The accounts service.
 * </summary>
 */
public interface IAccountsService
{
    /**
     * <summary>
     * Get all users.
     * </summary>
     * <returns>
     * Query of all users.
     * </returns>
     */
    IQueryable<GetUserDto> Get();

    /**
     * <summary>
     * Get all users with pagination.
     * </summary>
     * <param name="pageNumber">
     * The page number.
     * </param>
     * <param name="pageSize">
     * The page size.
     * </param>
     * <param name="orderBy">
     * The ordering of the users.
     * </param>
     * <param name="selectBy">
     * The criteria to select the users.
     * </param>
     * <returns>
     * <see cref="PagedListInfo{T}"/> of users.
     * </returns>
     */
    Task<PagedListInfo<GetUserDto>> Get(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    );

    /**
     * <summary>
     * Get a user by ID.
     * </summary>
     * <param name="id">
     * The user ID.
     * </param>
     * <returns>
     * The user with the specified ID.
     * </returns>
     */
    Task<GetUserDto> Get(string id);

    /**
     * <summary>
     * Commit a login.
     * </summary>
     * <param name="dto">
     * The user data.
     * </param>
     */
    Task<LoginResponseDto> Login(LoginDto dto);

    /**
     * <summary>
     * Commit a Google authentication.
     * </summary>
     * <param name="token">
     * The Google-given JWT token.
     * </param>
     */
    Task<LoginResponseDto> GoogleAuth(string token);

    /**
     * <summary>
     * Register a new user.
     * </summary>
     * <param name="dto">
     * The user data.
     * </param>
     */
    Task Register(RegisterDto dto);

    /**
     * <summary>
     * Log out the user.
     * </summary>
     */
    Task Logout();

    /**
     * <summary>
     * Delete a user by ID.
     * </summary>
     * <param name="id">
     * The user ID.
     * </param>
     */
    Task Delete(string id);

    /**
     * <summary>
     * Edit a user by ID.
     * </summary>
     * <param name="userId">
     * The user ID.
     * </param>
     * <param name="userDto">
     * The new user data.
     * </param>
     */
    Task Edit(string userId, EditUserDto userDto);

    /**
     * <summary>
     * Check if a user exists by username.
     * </summary>
     * <param name="userName">
     * The username to match.
     * </param>
     * <returns>
     * True if a user exists, false otherwise.
     * </returns>
     */
    Task<bool> CheckUsernameExists(string userName);

    /**
     * <summary>
     * Check if a user exists by the email.
     * </summary>
     * <param name="email">
     * The email to match.
     * </param>
     * <returns>
     * True if a user exists, false otherwise.
     * </returns>
     */
    Task<bool> CheckEmailExists(string email);
}
