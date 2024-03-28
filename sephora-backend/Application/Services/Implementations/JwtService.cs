namespace CleanArchitecture.Application.Services.Implementations;

public class JwtService(
    UserManager<UserEntity> userManager,
    JwtOptions jwtOpts
) : IJwtService
{
    public string CreateToken(IEnumerable<Claim> claims)
    {
        var keyBytes = Encoding.UTF8.GetBytes(
            jwtOpts.Key ??
            throw new InvalidOperationException()
        );
        var securityKey = new SymmetricSecurityKey(keyBytes);
        var credentials = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            issuer: jwtOpts.Issuer,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(jwtOpts.Lifetime),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public IEnumerable<Claim> GetClaims(UserEntity user)
    {
        var claims = new List<Claim>
        {
            new(CustomClaimTypes.Id, user.Id),
            new(ClaimTypes.NameIdentifier, user.Id),
            new(CustomClaimTypes.UserName, user.UserName ?? ""),
            new(CustomClaimTypes.Email, user.Email ?? ""),
            new(CustomClaimTypes.ProfilePicture, user.ProfilePicture ?? ""),
            new(
                CustomClaimTypes.RegistrationDate,
                user.RegistrationDate.ToString(CultureInfo.InvariantCulture)
            ),
        };

        var roles = userManager.GetRolesAsync(user).Result;
        claims.AddRange(roles.Select(role => new Claim(ClaimsIdentity.DefaultRoleClaimType, role)));

        return claims;
    }
}

public static class CustomClaimTypes
{
    public const string Id = "id";
    public const string UserName = "userName";
    public const string Email = "email";
    public const string Roles = "roles";
    public const string ProfilePicture = "profilePicture";
    public const string RegistrationDate = "registrationDate";
}
