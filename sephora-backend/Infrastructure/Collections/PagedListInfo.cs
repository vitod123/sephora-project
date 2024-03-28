// Purpose: Contains the PagedListInfo class and the PagedListInfo static class.
// ReSharper disable NotAccessedPositionalProperty.Global

namespace Infrastructure.Collections;

/**
 * <summary>
 * The paged list info.
 * </summary>
 * <typeparam name="T">
 * The type of the items.
 * </typeparam>
 */
public record PagedListInfo<T>(
    IEnumerable<T> Items = default!,
    int CurrentPage = 0,
    int PageSize = 0,
    int TotalPages = 0,
    long TotalCount = 0,
    bool HasPreviousPage = false,
    bool HasNextPage = false
);

/**
 * <summary>
 * The paged list info static extensions.
 * </summary>
 */
public static class PagedListInfo
{
    public static PagedListInfo<T> Create<T>(
        IEnumerable<T> items,
        int currentPage,
        int pageSize,
        long totalCount
    )
    {
        int totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
        return new PagedListInfo<T>
        {
            Items = items,
            CurrentPage = currentPage,
            PageSize = pageSize,
            TotalPages = totalPages,
            TotalCount = totalCount,
            HasPreviousPage = currentPage > 1,
            HasNextPage = currentPage < totalPages
        };
    }
}
