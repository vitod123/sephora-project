namespace CleanArchitecture.Application.Helpers;

public class JwtOptions
{
    public string? Issuer { get; init; }
    public string? Key { get; init; }
    public int Lifetime { get; init; }

    public string? GoogleClientId { get; init; }
    
    public string? GoogleClientSecret { get; init; }

    // TODO: add audience validation in the future (and RSA based tokens)
    // public string? Audience { get; init; }

    public bool AreValid
        => !String.IsNullOrWhiteSpace(Issuer) &&
           !String.IsNullOrWhiteSpace(Key) &&
           Lifetime > 0 &&
           !String.IsNullOrWhiteSpace(GoogleClientId) &&
           !String.IsNullOrWhiteSpace(GoogleClientSecret);
}
