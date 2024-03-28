namespace CleanArchitecture.Application.Services.Interfaces;

/**
 * <summary>
 * The category service.
 * </summary>
 */
public interface ICategoryService
{
    /**
     * <summary>
     * Get all categories.
     * </summary>
     * <returns>
     * Query of all categories.
     * </returns>
     */
    IQueryable<CategoryDto> Get();

    /**
     * <summary>
     * Get all categories with pagination.
     * </summary>
     * <param name="pageNumber">
     * The page number.
     * </param>
     * <param name="pageSize">
     * The page size.
     * </param>
     * <param name="orderBy">
     * The ordering of the categories.
     * </param>
     * <param name="selectBy">
     * The criteria to select the categories.
     * </param>
     * <returns>
     * <see cref="PagedListInfo{T}"/> of categories.
     * </returns>
     */
    Task<PagedListInfo<CategoryDto>> Get(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    );

    /**
     * <summary>
     * Get a category by ID.
     * </summary>
     * <param name="id">
     * The category ID.
     * </param>
     * <returns>
     * The <see cref="CategoryDto"/> with specified ID.
     * </returns>
     */
    Task<CategoryDto?> GetById(int id);
    
    /**
     * <summary>
     * Creates a new category.
     * </summary>
     * <param name="categoryDto">
     * The category to create.
     * </param>
     */
    Task Create(CreateCategoryDto categoryDto);
    
    /**
     * <summary>
     * Edits the specified category.
     * </summary>
     * <param name="categoryDto">
     * The category to edit.
     * </param>
     */
    Task Edit(EditCategoryDto categoryDto);
    
    /**
     * <summary>
     * Deletes a category.
     * </summary>
     * <param name="id">
     * The category ID.
     * </param>
     */
    Task Delete(int id);
}
