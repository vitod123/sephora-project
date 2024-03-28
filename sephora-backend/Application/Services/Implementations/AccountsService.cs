using System.Linq.Dynamic.Core;

namespace CleanArchitecture.Application.Services.Implementations;

public class AccountsService(
    UserManager<UserEntity> userManager,
    SignInManager<UserEntity> signInManager,
    IJwtService jwtService,
    IPictureService pictureService,
    IMapper mapper,
    IConfiguration configuration
) : IAccountsService
{
    private static string? EnvName =>
        Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

    private static void EnsureResultSucceeded(IdentityResult result)
    {
        if (!result.Succeeded)
            throw new HttpException(
                String.Join(", ", result.Errors.Select(x => x.Description)),
                HttpStatusCode.BadRequest
            );
    }

    public IQueryable<GetUserDto> Get()
        => userManager.Users
            .Include(x => x.CartItems)
            .Include(x => x.Orders)
            .ProjectTo<GetUserDto>(mapper.ConfigurationProvider);

    public async Task<PagedListInfo<GetUserDto>> Get(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    )
    {
        var query = userManager.Users
            .Include(x => x.CartItems)
            .Include(x => x.Orders)
            .AsQueryable();
        if (!String.IsNullOrWhiteSpace(orderBy))
            query = query.OrderBy(orderBy);
        if (!String.IsNullOrWhiteSpace(selectBy))
            query = query.Where(selectBy);

        var result = await query
            .ProjectTo<GetUserDto>(mapper.ConfigurationProvider)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return PagedListInfo.Create(
            result,
            pageNumber,
            pageSize,
            await userManager.Users.LongCountAsync()
        );
    }

    public async Task<GetUserDto> Get(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user is null)
            throw new HttpException(
                $"User with ID={{{id}}} is not found",
                HttpStatusCode.NotFound
            );

        var userDto = mapper.Map<GetUserDto>(user);
        userDto.Roles = (List<string>)await userManager.GetRolesAsync(user);
        return userDto;
    }

    public async Task Edit(string userId, EditUserDto userDto)
    {
        var user = await userManager.FindByIdAsync(userId);
        if (user is null)
            throw new HttpException(
                ErrorMessages.UserByIDNotFound,
                HttpStatusCode.NotFound
            );

        string? oldFileName = user.ProfilePicture;
        mapper.Map(userDto, user);
        if (userDto.ProfilePicture is not null)
        {
            pictureService.DeleteFile(oldFileName);
            var newPfp = await pictureService.SaveImage(userDto.ProfilePicture);
            user.ProfilePicture = newPfp;
        }
        else user.ProfilePicture = oldFileName;

        await userManager.UpdateAsync(user);
    }

    public async Task Delete(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user is null)
            throw new HttpException(
                ErrorMessages.UserByIDNotFound,
                HttpStatusCode.NotFound
            );

        pictureService.DeleteFile(user.ProfilePicture);

        var result = await userManager.DeleteAsync(user);
        if (!result.Succeeded)
            throw new HttpException(
                String.Join(", ", result.Errors.Select(x => x.Description)),
                HttpStatusCode.BadRequest
            );
    }

    public async Task<LoginResponseDto> Login(LoginDto dto)
    {
        var user = await userManager.FindByEmailAsync(dto.Email);
        if (user is null ||
            !await userManager.CheckPasswordAsync(user, dto.Password))
            throw new HttpException(
                ErrorMessages.InvalidCreds,
                HttpStatusCode.BadRequest
            );

        // Login and return token
        await signInManager.SignInAsync(user, true);
        return new LoginResponseDto
        {
            Token = jwtService.CreateToken(jwtService.GetClaims(user))
        };
    }

    public async Task<LoginResponseDto> GoogleAuth(string token)
    {
        bool isDev = EnvName == "Development";
        var settings = new GoogleJsonWebSignature.ValidationSettings
        {
            Audience =
            [ // Google Client ID
                isDev
                    ? configuration["JwtOptions:GoogleClientId"]
                    : Environment.GetEnvironmentVariable("GoogleClientId")
            ]
        };

        var payload = await GoogleJsonWebSignature.ValidateAsync(token, settings);
        UserEntity? user = await userManager.FindByEmailAsync(payload.Email);

        if (user is null)
        {
            // Prepare user if not exists
            user = new UserEntity
            {
                Email = payload.Email ?? String.Empty,
                UserName = payload.Name ?? String.Empty,
                FirstName = payload.GivenName ?? String.Empty,
                LastName = payload.FamilyName ?? String.Empty,
                ProfilePicture = payload.Picture ?? String.Empty,
                EmailConfirmed = payload.EmailVerified
            };

            // Add user to database, add claims and roles
            var result = await userManager.CreateAsync(user);
            EnsureResultSucceeded(result);
            result = await userManager.AddToRoleAsync(user, "User");
            EnsureResultSucceeded(result);
        }

        // Login and return token
        if (payload.Email is null)
            throw new HttpException(
                ErrorMessages.UserNotFound,
                HttpStatusCode.NotFound
            );
        user = await userManager.FindByEmailAsync(payload.Email);
        if (user is null)
            throw new HttpException(
                ErrorMessages.UserNotFound,
                HttpStatusCode.NotFound
            );

        await signInManager.SignInAsync(user, true, "Google");
        return new LoginResponseDto
        {
            Token = jwtService.CreateToken(jwtService.GetClaims(user))
        };
    }

    public async Task Logout()
        => await signInManager.SignOutAsync();

    public async Task Register(RegisterDto dto)
    {
        if (await CheckEmailExists(dto.Email))
            throw new HttpException(
                "User with this email already exists",
                HttpStatusCode.BadRequest
            );
        if (dto.Password != dto.PasswordConfirmation)
            throw new HttpException(
                "Passwords do not match",
                HttpStatusCode.BadRequest
            );

        string? pfp = dto.ProfilePicture is null
            ? null
            : await pictureService.SaveImage(dto.ProfilePicture);

        var user = mapper.Map<UserEntity>(dto);
        user.ProfilePicture = pfp;

        var result = await userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
        {
            pictureService.DeleteFile(pfp);

            throw new HttpException(
                String.Join(", ", result.Errors.Select(x => x.Description)),
                HttpStatusCode.BadRequest
            );
        }

        await userManager.AddToRoleAsync(user, nameof(user));
    }

    public async Task<bool> CheckEmailExists(string email)
    {
        var user = await userManager.FindByEmailAsync(email);
        return user is not null;
    }

    public async Task<bool> CheckUsernameExists(string userName)
    {
        var user = await userManager.FindByNameAsync(userName);
        return user is not null;
    }
}
