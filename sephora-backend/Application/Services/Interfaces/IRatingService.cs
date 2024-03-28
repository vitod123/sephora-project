namespace CleanArchitecture.Application.Services.Interfaces;

/**
 * <summary>
 * The rating service.
 * </summary>
 */
public interface IRatingService
{
    /**
     * <summary>Get all the ratings</summary>
     * <returns>A list of ratings</returns>
     */
    IQueryable<RatingDto> Get();

    /**
     * <summary>Get a paged list of ratings</summary>
     * <param name="pageNumber">The page number</param>
     * <param name="pageSize">The size of the page</param>
     * <param name="orderBy">The order by clause (orders by property)</param>
     * <param name="selectBy">The select by clause (orders by property)</param>
     * <returns>A paged list of ratings</returns>
     */
    Task<PagedListInfo<RatingDto>> Get(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    );

    /**
     * <summary>Get a rating by its ID</summary>
     * <param name="id">The ID of the rating</param>
     * <returns>The rating with the given ID or null</returns>
     */
    Task<RatingDto?> GetById(long id);

    /**
     * <summary>Create a new rating</summary>
     * <param name="createRatingDto">The rating to be created</param>
     * <param name="user">The user that is creating the rating</param>
     * <exception cref="UnauthorizedAccessException">User is not found</exception>
     */
    Task Create(CreateRatingDto createRatingDto, ClaimsPrincipal user);

    /**
     * <summary>Edit a rating</summary>
     * <param name="editRatingDto">The rating to be edited</param>
     * <param name="user">The user that is editing the rating</param>
     * <exception cref="UnauthorizedAccessException">
     * User is either not found or doesn't own the rating
     * </exception>
     */
    Task Edit(EditRatingDto editRatingDto, ClaimsPrincipal user);

    /**
     * <summary>Delete a rating</summary>
     * <param name="id">The ID of the rating to be deleted</param>
     * <param name="user">The user that is deleting the rating</param>
     * <exception cref="UnauthorizedAccessException">
     * User is either not found or doesn't own the rating
     * </exception>
     */
    Task Delete(long id, ClaimsPrincipal user);
}
