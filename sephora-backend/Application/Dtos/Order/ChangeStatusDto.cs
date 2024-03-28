namespace CleanArchitecture.Application.Dtos.Order;

public class ChangeStatusDto
{
    public long Id { get; set; }
    public OrderStatus Status { get; set; }
}
