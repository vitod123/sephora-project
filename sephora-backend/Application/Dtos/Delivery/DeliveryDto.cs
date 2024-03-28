namespace CleanArchitecture.Application.Dtos.Delivery;

public class DeliveryDto
{
    public long Id { get; set; }

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

    public string FirstName { get; set; } = String.Empty;
    
    public string LastName { get; set; } = String.Empty;

    public string PhoneNumber { get; set; } = String.Empty;

    public string Email { get; set; } = String.Empty;
}
