namespace CleanArchitecture.Application.Services.Implementations;

public class ProductService(
    IRepository<ProductEntity> productRepo,
    IRepository<Characteristic> charRepo,
    IRepository<Favorite> favRepo,
    IPieceService pieceService,
    UserManager<UserEntity> userManager,
    ISearchService<ProductEntity, ProductDto> searchService,
    IMapper mapper
) : IProductService
{
    private async Task<bool> IsFavorite(ClaimsPrincipal? user, long productId)
    {
        if (user is null)
            return false;

        var userId = userManager.GetUserId(user);
        if (userId is null)
            return false;

        var favorite = await favRepo.GetItemBySpec(
            new Favorites.Find(userId, productId)
        );
        return favorite?.IsActive ?? false;
    }

    public async Task<ProductDto> Create(CreateProductDto createProductDto)
    {
        var entity = mapper.Map<ProductEntity>(createProductDto);
        await productRepo.Insert(entity);
        await productRepo.Save();

        // index the product
        entity = await productRepo.GetItemBySpec(new Products.GetById(entity.Id));
        searchService.Index(entity!);
        return mapper.Map<ProductDto>(entity);
    }

    public async Task Delete(long id)
    {
        var product = await productRepo.GetItemBySpec(
            new Products.GetById(id)
        );
        if (product is null)
            throw new ArgumentException(
                $"Product with the id={{{id}}} is not found"
            );

        // delete pieces directly so the files are also cleaned up
        var pieces = product.ProductPieces.ToList();
        foreach (var piece in pieces)
            await pieceService.Delete(piece.Id);

        foreach (var c in product.Characteristics)
            await charRepo.Delete(c);

        foreach (var c in product.Characteristics)
            await charRepo.Delete(c);

        var favorites = await favRepo.GetListBySpec(
            new Favorites.GetByProduct(id)
        ).ToListAsync();
        foreach (var favorite in favorites)
            await favRepo.Delete(favorite);

        await productRepo.Delete(product);
        await productRepo.Save();

        // remove from index
        searchService.Remove(product);
    }

    public async Task Edit(EditProductDto editProductDto)
    {
        foreach (var characteristic in editProductDto.Characteristics)
        {
            var c = mapper.Map<Characteristic>(characteristic);
            c.ProductId = editProductDto.Id;
            switch (c.Id)
            {
                case 0:
                    await charRepo.Insert(c);
                    break;
                case < 0:
                    throw new ArgumentException(
                        "Characteristic with the ID less than 0 is not allowed"
                    );
                default: // any positive value
                    await charRepo.Update(c);
                    break;
            }
        }

        foreach (var charId in editProductDto.DeleteCharacteristics)
            await charRepo.Delete(charId);

        await charRepo.Save();

        var entity = await productRepo.GetById(editProductDto.Id);
        if (entity is null)
            throw new ArgumentException(
                $"Product with the id={{{editProductDto.Id}}} is not found"
            );

        // remove from index
        searchService.Remove(entity);

        mapper.Map(editProductDto, entity);
        await productRepo.Update(entity);
        await productRepo.Save();

        // index the product
        entity = await productRepo.GetItemBySpec(new Products.GetById(entity.Id));
        searchService.Index(entity!);
    }

    public async Task<IEnumerable<LightProductDto>> Get(
        ClaimsPrincipal? user = null
    )
    {
        var products = await productRepo.GetListBySpec(new Products.GetAll())
            .ProjectTo<LightProductDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        if (user is null)
            return products;

        foreach (var product in products)
            product.IsFavorite = await IsFavorite(user, product.Id);

        return products;
    }

    public async Task<PagedListInfo<LightProductDto>> Get(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null,
        ClaimsPrincipal? user = null
    )
    {
        long count = await productRepo.CountBySpec(selectBy);
        var list = await productRepo
            .GetRangeBySpec(
                new Products.GetAll(),
                pageNumber, pageSize, orderBy, selectBy
            )
            .ProjectTo<LightProductDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        foreach (var product in list)
            product.IsFavorite = await IsFavorite(user, product.Id);

        return PagedListInfo.Create(list, pageNumber, pageSize, count);
    }

    public async Task<ProductDto?> GetById(long id, ClaimsPrincipal? user = null)
    {
        ProductEntity? entity = await productRepo.GetItemBySpec(
            new Products.GetById(id)
        );

        if (entity is null)
            return null;

        entity.ProductPieces = entity.ProductPieces
            .OrderByDescending(x => x.CreatedAt)
            .ToList();

        foreach (var piece in entity.ProductPieces)
            piece.Product = null!;

        var dto = mapper.Map<ProductDto>(entity);
        dto.IsFavorite = await IsFavorite(user, entity.Id);
        return dto;
    }
}
