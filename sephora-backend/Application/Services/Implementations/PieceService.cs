using HttpException = CleanArchitecture.Application.Helpers.HttpException;

namespace CleanArchitecture.Application.Services.Implementations;

public class PieceService(
    IRepository<ProductPiece> repo,
    IRepository<ProductPicture> prodPicRepo,
    IPictureService pictureService,
    IFavoritesService favService,
    IMapper mapper
) : IPieceService
{
    public async Task<IEnumerable<LightProductPieceDto>> Get(
        ClaimsPrincipal? user = null
    )
    {
        var query = repo.GetListBySpec(new ProductPieces.GetAll())
            .ProjectTo<LightProductPieceDto>(mapper.ConfigurationProvider);
        var list = await query.ToListAsync();
        if (user is null)
            return list;

        foreach (var piece in list)
            piece.Product.IsFavorite = await favService.IsFavorite(user, piece.Product.Id);

        return list;
    }

    public async Task<PagedListInfo<LightProductPieceDto>> Get(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null,
        ClaimsPrincipal? user = null
    )
    {
        long count = await repo.CountBySpec(selectBy);
        var list = await repo
            .GetRange(pageNumber, pageSize, orderBy, selectBy)
            .ProjectTo<LightProductPieceDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        if (user is null)
            return PagedListInfo.Create(list, pageNumber, pageSize, count);

        foreach (var piece in list)
            piece.Product.IsFavorite = await favService.IsFavorite(user, piece.Product.Id);

        return PagedListInfo.Create(list, pageNumber, pageSize, count);
    }

    public async Task<ProductPieceDto?> GetById(
        long id,
        ClaimsPrincipal? user = null
    )
    {
        var piece = await repo.GetItemBySpec(new ProductPieces.GetById(id));
        if (piece is null)
            return null;

        bool isFavorite = user is not null
                          && await favService.IsFavorite(user, piece.Id);

        var dto = mapper.Map<ProductPieceDto>(piece);
        dto.Product.IsFavorite = isFavorite;
        return dto;
    }

    public async Task Create(CreateProductPieceDto pieceDto)
    {
        var entity = mapper.Map<ProductPiece>(pieceDto);

        await repo.Insert(entity);
        await repo.Save();

        // save attached pictures
        await SavePictures(pieceDto.ProductPictures, entity.Id);
    }

    public async Task Edit(EditProductPieceDto pieceDto)
    {
        // get the entity
        var entity = await repo.GetById(pieceDto.Id);
        if (entity is null)
            throw new HttpException(
                "Product piece not found",
                HttpStatusCode.NotFound
            );

        // update entity
        mapper.Map(pieceDto, entity);
        await repo.Update(entity);
        await repo.Save();
    }

    public async Task DeletePictures(DeletePiecePicturesDto dto)
    {
        var picsToDelete = dto.PictureNames
            .Select(x =>
                prodPicRepo.GetItemBySpec(
                    new ProductPictures.GetByPath(x)
                ).Result
            );
        await DeletePictures(picsToDelete);
    }

    public async Task Delete(long id)
    {
        // detach pictures
        var pictures = await prodPicRepo.GetListBySpec(
            new ProductPictures.GetByPieceId(id)
        ).ToListAsync();
        await DeletePictures(pictures);

        // delete the entity
        await repo.Delete(id);
        await repo.Save();
    }

    private async Task DeletePictures(IEnumerable<ProductPicture?> pictures)
    {
        foreach (var pic in pictures)
        {
            if (pic is null)
                continue;

            // delete a picture physically
            pictureService.DeleteFile(pic.PicturePath);
            // delete from the database
            await prodPicRepo.Delete(pic.Id);
        }

        await prodPicRepo.Save();
    }

    public async Task SavePictures(
        IEnumerable<IFormFile> formPictures,
        long ownerId
    )
    {
        // save pics physically
        var pics = await Task.WhenAll(
            formPictures.Select(pictureService.SaveImage)
        );

        // save pics to the database
        foreach (var pic in pics)
            await prodPicRepo.Insert(new ProductPicture
            {
                PicturePath = pic,
                ProductPieceId = ownerId
            });
        await prodPicRepo.Save();
    }
}
