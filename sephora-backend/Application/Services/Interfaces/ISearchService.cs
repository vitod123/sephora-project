namespace CleanArchitecture.Application.Services.Interfaces;

/**
 * <summary>
 * The search service (powers our search engine on the website).
 * </summary>
 */
public interface ISearchService<in T, TDto>
{
    /**
     * <summary>Indexes the entity in the search engine</summary>
     * <param name="item">The item to index</param>
     */
    void Index(T item);

    /**
     * <summary>Indexes the entities in the search engine</summary>
     * <param name="items">The items to index</param>
     */
    void Index(IEnumerable<T> items);

    /**
     * <summary>Removes the entity from the search engine.</summary>
     * <param name="entity">The entity to remove</param>
     */
    void Remove(T entity);

    /**
     * <summary>Execute the search</summary>
     * <param name="searchTerm">The search phrase</param>
     * <param name="pageNumber">The page number</param>
     * <param name="pageSize">The page size</param>
     * <returns>The search results</returns>
     */
    Task<PagedListInfo<TDto>> Search(
        string searchTerm,
        int pageNumber = 1,
        int pageSize = 10
    );
} 
