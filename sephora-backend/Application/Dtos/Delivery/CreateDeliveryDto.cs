namespace CleanArchitecture.Application.Dtos.Delivery;

public class CreateDeliveryDto
{
    public string Address { get; set; } = String.Empty;
    
    public string Provider { get; set; } = String.Empty;
    
    public string? PostalCode { get; set; }
    
    public string? Country { get; set; } = "Ukraine";
    
    public string? Region { get; set; } // Область
    
    public string? District { get; set; } // Район
    
    public string? City { get; set; }
    
    public string? Street { get; set; }
    
    public string? Building { get; set; }
    
    public string? Apartment { get; set; }
    
    public string? NovaPostWarehouse { get; set; }
    
    /* User is not required, because
     * it is not needed when creating a delivery.
     * If is user is authed,
     * their ID will be fetched from the token in the backend.
    */
}
