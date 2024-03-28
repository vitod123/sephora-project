namespace CleanArchitecture.Application.Services.Implementations;

public class FavoritesService(
    UserManager<UserEntity> userManager,
    IRepository<ProductEntity> productRepository,
    IRepository<Favorite> favoritesRepository,
    IMapper mapper
) : IFavoritesService
{
    private string GetUserIdOrThrow(ClaimsPrincipal user)
        => userManager.GetUserId(user)
           ?? throw new UnauthorizedAccessException(
               ErrorMessages.UserNotFound
           );

    public async Task ChangeFavoriteStatus(ClaimsPrincipal user, long productId)
    {
        var userId = GetUserIdOrThrow(user);
        bool exists = await productRepository.Exists(productId);
        if (!exists)
            throw new ArgumentException(
                $"Product with the id={{{productId}}} is not found"
            );

        var favorite = await favoritesRepository.GetItemBySpec(
            new Favorites.Get(userId, productId)
        );

        if (favorite is null)
        {
            await favoritesRepository.Insert(new Favorite
            {
                UserId = userId,
                ProductId = productId,
                IsActive = true
            });
        }
        else
        {
            favorite.IsActive = !favorite.IsActive;
            await favoritesRepository.Update(favorite);
        }

        await favoritesRepository.Save();
    }

    public async Task<bool> IsFavorite(ClaimsPrincipal? user, long productId)
    {
        if (user is null)
            return false;

        try
        {
            string userId = GetUserIdOrThrow(user);
            Favorite? fav = await favoritesRepository.GetItemBySpec(
                new Favorites.Find(userId, productId)
            );
            return fav is not null;
        }
        catch
        {
            return false;
        }
    }

    public async Task<IEnumerable<LightProductDto>> Get(ClaimsPrincipal user)
    {
        string userId = GetUserIdOrThrow(user);
        var list = await favoritesRepository.GetListBySpec(
                new Favorites.GetByUser(userId)
            ).Select(x => x.Product)
            .ProjectTo<LightProductDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        // Mark all products as favorites
        // (they are in favorites list by definition of the query)
        foreach (var p in list)
            p.IsFavorite = true;
        
        return list;
    }

    public async Task<PagedListInfo<LightProductDto>> Get(
        ClaimsPrincipal user,
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    )
    {
        var userId = GetUserIdOrThrow(user);
        long count = await favoritesRepository.GetListBySpec(
            new Favorites.GetByUser(userId)
        ).LongCountAsync();
        
        var list = await favoritesRepository.GetRangeBySpec(
                new Favorites.GetByUser(userId),
                pageNumber,
                pageSize,
                orderBy,
                selectBy
            )
            .Select(x => x.Product)
            .ProjectTo<LightProductDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        // Mark all products as favorites
        // (they are in favorites list by definition of the query)
        foreach (var p in list)
            p.IsFavorite = true;

        return PagedListInfo.Create(list, pageNumber, pageSize, count);
    }
}
