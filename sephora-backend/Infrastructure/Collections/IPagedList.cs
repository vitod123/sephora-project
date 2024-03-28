namespace Infrastructure.Collections;

/**
 * <summary>
 * The paged list interface.
 * </summary>
 * <typeparam name="T">
 * The type of the items in the list.
 * </typeparam>
 */
public interface IPagedList<T> : IList<T>
{
    /**
     * <summary>
     * The current page number.
     * </summary>
     */
    int CurrentPage { get; }
    
    /**
     * <summary>
     * The number of items per page.
     * </summary>
     */
    int PageSize { get; }
    
    /**
     * <summary>
     * The total number of pages.
     * </summary>
     */
    int TotalCount { get; }
    
    /**
     * <summary>
     * The total number of items.
     * </summary>
     */
    int TotalPages { get; }
    
    /**
     * <summary>
     * Whether there is a previous page.
     * </summary>
     */
    bool HasPreviousPage => CurrentPage > 1 && TotalPages > 1;
    
    /**
     * <summary>
     * Whether there is a next page.
     * </summary>
     */
    bool HasNextPage => CurrentPage < TotalPages;
}
