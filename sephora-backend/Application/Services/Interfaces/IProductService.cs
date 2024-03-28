namespace CleanArchitecture.Application.Services.Interfaces;

/**
 * <summary>
 * The product service.
 * </summary>
 */
public interface IProductService
{
    /**
     * <summary>Gets the products</summary>
     * <param name="user">The user to map the favorites</param>
     */
    Task<IEnumerable<LightProductDto>> Get(ClaimsPrincipal? user = null);

    /**
     * <summary>Gets the products</summary>
     * <param name="pageNumber">The page number</param>
     * <param name="pageSize">The page size</param>
     * <param name="orderBy">The order by</param>
     * <param name="selectBy">The select by</param>
     * <param name="user">The user to map the favorites</param>
     */
    Task<PagedListInfo<LightProductDto>> Get(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null,
        ClaimsPrincipal? user = null
    );

    /**
     * <summary>Gets the product by its id</summary>
     * <param name="id">The id of the product</param>
     * <param name="user">The user to map the favorites</param>
     */
    Task<ProductDto?> GetById(long id, ClaimsPrincipal? user = null);
    
    /**
     * <summary>Creates a new product</summary>
     * <param name="createProductDto">The product to create</param>
     */
    Task<ProductDto> Create(CreateProductDto createProductDto);
    
    /**
     * <summary>Edits the product</summary>
     * <param name="editProductDto">The product to edit</param>
     */
    Task Edit(EditProductDto editProductDto);
    
    /**
     * <summary>Deletes the product</summary>
     * <param name="id">The id of the product</param>
     */
    Task Delete(long id);
}
