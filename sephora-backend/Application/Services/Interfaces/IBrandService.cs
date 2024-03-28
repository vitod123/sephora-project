namespace CleanArchitecture.Application.Services.Interfaces;

/**
 * <summary>
 * The brand service.
 * </summary>
 */
public interface IBrandService
{
    /**
     * <summary>
     * Get all brands.
     * </summary>
     * <returns>
     * Query of all brands.
     * </returns>
     */
    IQueryable<BrandDto> Get();

    /**
     * <summary>
     * Get all brands with pagination.
     * </summary>
     * <param name="pageNumber">
     * The page number.
     * </param>
     * <param name="pageSize">
     * The page size.
     * </param>
     * <param name="orderBy">
     * The ordering of the brands.
     * </param>
     * <param name="selectBy">
     * The criteria to select the brands.
     * </param>
     * <returns>
     * <see cref="PagedListInfo{T}"/> of brands.
     * </returns>
     */
    Task<PagedListInfo<BrandDto>> Get(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    );

    /**
     * <summary>
     * Get a brand by ID.
     * </summary>
     * <param name="id">
     * The brand ID.
     * </param>
     * <returns>
     * The <see cref="BrandDto"/> with specified ID.
     * </returns>
     */
    Task<BrandDto?> GetById(int id);

    /**
     * <summary>
     * Create a new brand.
     * </summary>
     * <param name="brandDto">
     * The brand to create.
     * </param>
     */
    Task Create(CreateBrandDto brandDto);

    /**
     * <summary>
     * Updates a brand.
     * </summary>
     * <param name="brandDto">
     * The brand to update.
     * </param>
     */
    Task Edit(BrandDto brandDto);

    /**
     * <summary>
     * Deletes a brand.
     * </summary>
     * <param name="id">
     * The brand ID.
     * </param>
     */
    Task Delete(int id);
}
