namespace CleanArchitecture.Application.Services.Interfaces;

/**
 * <summary>
 * The JSON Web Tokens service.
 * </summary>
 */
public interface IJwtService
{
    /**
     * <summary>
     * Get the claims of a user.
     * </summary>
     * <param name="user">
     * The user.
     * </param>
     * <returns>
     * The claims of the user.
     * </returns>
     */
    IEnumerable<Claim> GetClaims(UserEntity user);
    
    /**
     * <summary>
     * Create a token with the specified claims.
     * </summary>
     * <param name="claims">
     * The claims.
     * </param>
     * <returns>
     * The token.
     * </returns>
     */
    string CreateToken(IEnumerable<Claim> claims);
}
