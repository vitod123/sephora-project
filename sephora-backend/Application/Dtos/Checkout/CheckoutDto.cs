namespace CleanArchitecture.Application.Dtos.Checkout;

public class CheckoutDto
{
    public required IEnumerable<CreateCartDto> CartItems { get; init; }
    public required CreateDeliveryDto DeliveryDto { get; init; }
}
