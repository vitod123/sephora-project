namespace CleanArchitecture.Application.Services.Interfaces;

public interface ICartService
{
    /**
     * <summary>Get all cart items of the specified user</summary>
     * <param name="user">The user to get cart items of</param>
     * <returns>The cart items of the specified user</returns>
     */
    IQueryable<CartDto> Get(ClaimsPrincipal user);

    /**
     * <summary>Get paginated cart items of the specified user</summary>
     * <param name="user">The user to get cart items of</param>
     * <param name="pageNumber">The page number</param>
     * <param name="pageSize">The page size</param>
     * <param name="orderBy">The order by clause (orders by property)</param>
     * <param name="selectBy">The select by clause (orders by property)</param>
     * <returns>
     * The cart items of the specified user in the specified range
     * </returns>
     */
    Task<PagedListInfo<CartDto>> Get(
        ClaimsPrincipal user,
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    );

    /**
     * <summary>Get the cart item by its ID</summary>
     * <param name="id">The ID of the cart item</param>
     * <returns>The cart item with the specified ID</returns>
     */
    Task<CartDto?> GetById(long id);
    
    /**
     * <summary>Checks if the cart item with the specified ID exists</summary>
     * <param name="id">The ID of the cart item</param>
     * <returns>True if the cart item exists, false otherwise</returns>
     */
    Task<bool> Exists(long id);

    /**
     * <summary>Creates a new cart item</summary>
     * <param name="cartDto">The cart item to create</param>
     * <param name="user">The user to create the cart item for</param>
     */
    Task Create(CreateCartDto cartDto, ClaimsPrincipal user);

    /**
     * <summary>Updates a cart item</summary>
     * <param name="dto">The cart item to update</param>
     * <param name="user">The owner of a cart item</param>
     */
    public Task Update(UpdateCartDto dto, ClaimsPrincipal user);

    /**
     * <summary>Edits the specified cart item</summary>
     * <param name="id">The cart item ID to edit</param>
     * <param name="user">The user to edit the cart item for</param>
     */
    Task Delete(long id, ClaimsPrincipal user);

    /**
     * <summary>Cleanses the cart of a user</summary>
     * <param name="user">The user whose cart will be cleared</param>
     */
    Task DeleteAll(ClaimsPrincipal user);
}
