namespace CleanArchitecture.Application.Services.Interfaces;

/**
 * <summary>
 * The delivery service.
 * </summary>
 */
public interface IDeliveryService
{
    /**
     * <summary>
     * Get all deliveries.
     * </summary>
     * <returns>
     * Query of all deliveries.
     * </returns>
     */
    IQueryable<DeliveryDto> Get();

    /**
     * <summary>
     * Get all deliveries with pagination.
     * </summary>
     * <param name="pageNumber">
     * The page number.
     * </param>
     * <param name="pageSize">
     * The page size.
     * </param>
     * <param name="orderBy">
     * The ordering of the deliveries.
     * </param>
     * <param name="selectBy">
     * The criteria to select the deliveries.
     * </param>
     * <returns>
     * <see cref="PagedListInfo{T}"/> of deliveries.
     * </returns>
     */
    Task<PagedListInfo<DeliveryDto>> Get(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    );

    /**
     * <summary>
     * Get a delivery by ID.
     * </summary>
     * <param name="id">
     * The delivery ID.
     * </param>
     * <returns>
     * The <see cref="DeliveryDto"/> with specified ID.
     * </returns>
     */
    Task<DeliveryDto?> GetById(long id);
    
    /**
     * <summary>
     * Create a delivery.
     * </summary>
     * <param name="deliveryDto">
     * The delivery data transfer object.
     * </param>
     */
    Task Create(CreateDeliveryDto deliveryDto);
    
    /**
     * <summary>
     * Edit a delivery.
     * </summary>
     * <param name="deliveryDto">
     * The delivery data transfer object.
     * </param>
     */
    Task Edit(DeliveryDto deliveryDto);
    
    /**
     * <summary>
     * Delete a delivery.
     * </summary>
     * <param name="id">
     * The delivery ID.
     * </param>
     */
    Task Delete(long id);
}
