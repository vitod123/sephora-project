namespace CleanArchitecture.Application.Services.Interfaces;

/**
 * <summary>
 * The amount service.
 * </summary>
 */
public interface IAmountService
{
    /**
     * <summary>
     * Get all amounts.
     * </summary>
     * <returns>
     * Query of all amounts.
     * </returns>
     */
    IQueryable<AmountDto> Get();

    /**
     * <summary>
     * Get all amounts with pagination.
     * </summary>
     * <param name="pageNumber">
     * The page number.
     * </param>
     * <param name="pageSize">
     * The page size.
     * </param>
     * <param name="orderBy">
     * The ordering of the amounts.
     * </param>
     * <param name="selectBy">
     * The criteria to select the amounts.
     * </param>
     * <returns>
     * <see cref="PagedListInfo{T}"/> of amounts.
     * </returns>
     */
    Task<PagedListInfo<AmountDto>> Get(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    );

    /**
     * <summary>
     * Get an amount by ID.
     * </summary>
     * <param name="id">
     * The amount ID.
     * </param>
     * <returns>
     * The <see cref="AmountDto"/> with specified ID.
     * </returns>
     */
    Task<AmountDto?> GetById(int id);

    /**
     * <summary>
     * Creates a new amount.
     * </summary>
     * <param name="amountDto">
     * The amount to create.
     * </param>
     */
    Task Create(CreateAmountDto amountDto);

    /**
     * <summary>
     * Updates an amount.
     * </summary>
     * <param name="amountDto">
     * The amount to update.
     * </param>
     */
    Task Edit(AmountDto amountDto);

    /**
     * <summary>
     * Deletes an amount.
     * </summary>
     * <param name="id">
     * The amount ID.
     * </param>
     */
    Task Delete(int id);
}
