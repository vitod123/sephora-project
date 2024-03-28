namespace CleanArchitecture.Application.Services.Implementations;

public class DeliveryService(
    IRepository<DeliveryEntity> deliveryRepository,
    IMapper mapper
) : IDeliveryService
{
    public IQueryable<DeliveryDto> Get()
        => deliveryRepository.GetAll()
            .ProjectTo<DeliveryDto>(mapper.ConfigurationProvider);

    public async Task<PagedListInfo<DeliveryDto>> Get(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    )
    {
        long count = await deliveryRepository.CountBySpec(selectBy);
        var list = await deliveryRepository
            .GetRange(pageNumber, pageSize)
            .ProjectTo<DeliveryDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        return PagedListInfo.Create(list, pageNumber, pageSize, count);
    }

    public async Task<DeliveryDto?> GetById(long id)
    {
        DeliveryEntity? entity = await deliveryRepository.GetById(id);
        return entity is null ? null : mapper.Map<DeliveryDto>(entity);
    }

    public async Task Create(CreateDeliveryDto deliveryDto)
    {
        DeliveryEntity entity = mapper.Map<DeliveryEntity>(deliveryDto);
        await deliveryRepository.Insert(entity);
        await deliveryRepository.Save();
    }

    public async Task Edit(DeliveryDto deliveryDto)
    {
        DeliveryEntity entity = mapper.Map<DeliveryEntity>(deliveryDto);
        await deliveryRepository.Update(entity);
        await deliveryRepository.Save();
    }

    public async Task Delete(long id)
    {
        await deliveryRepository.Delete(id);
        await deliveryRepository.Save();
    }
}
