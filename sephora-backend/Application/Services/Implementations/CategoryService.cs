namespace CleanArchitecture.Application.Services.Implementations;

public class CategoryService(
    IRepository<Category> categoryRepository,
    IPictureService picService,
    IMapper mapper
) : ICategoryService
{
    public async Task Create(CreateCategoryDto categoryDto)
    {
        string picName = await picService.SaveImage(categoryDto.Picture);
        Category category = mapper.Map<Category>(categoryDto);
        category.Picture = picName;

        await categoryRepository.Insert(category);
        await categoryRepository.Save();
    }

    public async Task Delete(int id)
    {
        var category = await categoryRepository.GetById(id);
        if (category is null)
            throw new ApplicationException("Category not found");

        picService.DeleteFile(category.Picture);

        await categoryRepository.Delete(category);
        await categoryRepository.Save();
    }

    public async Task Edit(EditCategoryDto categoryDto)
    {
        var category = await categoryRepository.GetById(categoryDto);
        if (category is null)
            throw new ApplicationException("Category not found");

        string oldPic = category.Picture;
        mapper.Map(categoryDto, category);

        if (categoryDto.Picture is not null)
        {
            picService.DeleteFile(oldPic);
            category.Picture = await picService.SaveImage(categoryDto.Picture);
        }

        await categoryRepository.Update(category);
        await categoryRepository.Save();
    }

    public IQueryable<CategoryDto> Get()
        => categoryRepository.GetAll()
            .ProjectTo<CategoryDto>(mapper.ConfigurationProvider);

    public async Task<PagedListInfo<CategoryDto>> Get(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    )
    {
        long count = await categoryRepository.CountBySpec(selectBy);
        var list = await categoryRepository
            .GetRange(pageNumber, pageSize, orderBy, selectBy)
            .ProjectTo<CategoryDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        return PagedListInfo.Create(list, pageNumber, pageSize, count);
    }

    public async Task<CategoryDto?> GetById(int id)
    {
        Category? category = await categoryRepository.GetItemBySpec(
            new Categories.GetById(id)
        );

        if (category is null)
            throw new ApplicationException("Category not found");

        return mapper.Map<CategoryDto>(category);
    }
}
