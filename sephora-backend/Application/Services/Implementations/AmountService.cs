namespace CleanArchitecture.Application.Services.Implementations;

public class AmountService(
    IRepository<Amount> amountRepository,
    IMapper mapper)
    : IAmountService
{
    public async Task Create(CreateAmountDto amountDto)
    {
        await amountRepository.Insert(mapper.Map<Amount>(amountDto));
        await amountRepository.Save();
    }

    public async Task Delete(int id)
    {
        if (await amountRepository.GetById(id) == null)
            return;

        await amountRepository.Delete(id);
        await amountRepository.Save();
    }

    public async Task Edit(AmountDto amountDto)
    {
        await amountRepository.Update(mapper.Map<Amount>(amountDto));
        await amountRepository.Save();
    }

    public IQueryable<AmountDto> Get()
        => amountRepository.GetAll()
            .ProjectTo<AmountDto>(mapper.ConfigurationProvider);

    public async Task<PagedListInfo<AmountDto>> Get(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    )
    {
        long count = await amountRepository.CountBySpec(selectBy);
        var list = await amountRepository
            .GetRange(pageNumber, pageSize)
            .ProjectTo<AmountDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        return PagedListInfo.Create(list, pageNumber, pageSize, count);
    }

    public async Task<AmountDto?> GetById(int id)
    {
        Amount? amount = await amountRepository.GetItemBySpec(
            new Amounts.GetById(id)
        );
        return amount is null ? null : mapper.Map<AmountDto>(amount);
    }
}
