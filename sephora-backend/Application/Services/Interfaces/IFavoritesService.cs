namespace CleanArchitecture.Application.Services.Interfaces;

/**
 * <summary>
 * The favorites service.
 * </summary>
 */
public interface IFavoritesService
{
    /**
     * <summary>
     * Change the favorite status of a product.
     * </summary>
     * <param name="user">
     * The user.
     * </param>
     * <param name="productId">
     * The product ID.
     * </param>
     */
    Task ChangeFavoriteStatus(ClaimsPrincipal user, long productId);

    /**
     * <summary>
     * Check if a product is in user's favorites.
     * </summary>
     * <param name="user">
     * The user.
     * </param>
     * <param name="productId">
     * The product ID.
     * </param>
     * <returns>
     * True if the product is a favorite, false otherwise.
     * </returns>
     */
    Task<bool> IsFavorite(ClaimsPrincipal? user, long productId);

    /**
     * <summary>
     * Get all favorite products of a user.
     * </summary>
     * <param name="user">
     * The user.
     * </param>
     * <returns>
     * Query of all favorite products.
     * </returns>
     */
    Task<IEnumerable<LightProductDto>> Get(ClaimsPrincipal user);

    /**
     * <summary>
     * Get all favorite products of a user with pagination.
     * </summary>
     * <param name="user">
     * The user.
     * </param>
     * <param name="pageNumber">
     * The page number.
     * </param>
     * <param name="pageSize">
     * The page size.
     * </param>
     * <param name="orderBy">
     * The ordering of the products.
     * </param>
     * <param name="selectBy">
     * The criteria to select the products.
     * </param>
     * <returns>
     * <see cref="PagedListInfo{T}"/> of favorite products.
     * </returns>
     */
    Task<PagedListInfo<LightProductDto>> Get(
        ClaimsPrincipal user,
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    );
}
