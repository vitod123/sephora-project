namespace CleanArchitecture.Application.Services.Interfaces;

/**
 * <summary>
 * The checkout service.
 * </summary>
 */
public interface ICheckoutService
{
    /**
     * <summary>
     * Places an order for an unauthenticated user. <br/>
     * It takes the items from the request and creates an order with them. <br/>
     * It also creates a delivery entry with the specified data. <br/>
     * </summary>
     * <param name="cartItems">The items that will be added to the order</param>
     * <param name="delivery">The data of the delivery</param>
     */
    Task CheckoutUnauthed(IEnumerable<CreateCartDto> cartItems, CreateDeliveryDto delivery);

    /**
     * Places an order for the specified user. <br/>
     * It takes the items from the user's cart and
     * creates an order with them. <br/>
     */
    Task CheckoutAuthed(ClaimsPrincipal user);

    // SudoAdmin ONLY

    /**
     * <summary>
     * Cancels the order with the specified ID. <br/>
     * (Sets the status to CANCELLED)
     * </summary>
     * <param name="orderId">The ID of an order that will be cancelled</param>
     * <param name="user">The user who cancels the order</param>
     */
    Task CancelOrder(long orderId, ClaimsPrincipal user);

    /**
     * <summary>Changes the status of the order with the specified ID.</summary>
     * <param name="dto">The order which status will be changed</param>
     */
    Task ChangeStatus(ChangeStatusDto dto);

    /**
     * <summary>Gets all orders.</summary>
     * <returns>A list of all orders.</returns>
     */
    IQueryable<OrderDto> Get();

    /**
     * <summary>
     * Gets a list of orders. <br/>
     * The list is paginated and can be sorted in ascending or descending order.
     * </summary>
     * <param name="pageNumber">The number of the page</param>
     * <param name="pageSize">The size of the page</param>
     * <param name="orderBy">The order by clause (orders by property)</param>
     * <param name="selectBy">The select by clause (orders by property)</param>
     * <returns>A paginated list of orders.</returns>
     */
    Task<PagedListInfo<OrderDto>> Get(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    );

    /**
     * <summary>Gets the order with the specified ID.</summary>
     * <param name="id">The ID of an order that will be returned</param>
     * <returns>The order with the specified ID.</returns>
     */
    Task<CategoryDto?> GetById(long id);

    /**
     * <summary>Creates a new order.</summary>
     * <param name="orderDto">The data of the new order</param>
     */
    Task Edit(OrderDto orderDto);

    /**
     * <summary>Deletes the order with the specified ID.</summary>
     * <param name="id">The ID of an order that will be deleted</param>
     */
    Task Delete(long id);
}
