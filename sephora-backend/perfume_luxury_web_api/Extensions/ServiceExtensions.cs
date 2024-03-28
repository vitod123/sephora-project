using JsonSerializer = System.Text.Json.JsonSerializer;

namespace perfume_luxury_web_api.Extensions;

public static class ServiceExtensions
{
    public static void AddRepository(this IServiceCollection services)
    {
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
    }

    public static void AddDbContext(this IServiceCollection services, string connStr)
    {
        services.AddDbContext<PerfumeDbContext>(opt => opt.UseNpgsql(connStr));
    }

    public static void AddIdentity(this IServiceCollection services)
    {
        services.AddIdentity<UserEntity, IdentityRole>()
            .AddEntityFrameworkStores<PerfumeDbContext>()
            .AddDefaultTokenProviders();

        services.ConfigureApplicationCookie(options =>
        {
            options.AccessDeniedPath = PathString.Empty;
            options.LoginPath = PathString.Empty;
            options.Cookie.HttpOnly = true;
            options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
            options.Events.OnRedirectToLogin = async context =>
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(
                    JsonSerializer.Serialize(new ProblemDetails
                    {
                        Status = 401,
                        Title = "Unauthorized",
                        Detail = "You are not authorized to access this resource."
                    })
                );
            };
        });
    }

    public static void AddCustomServices(this IServiceCollection services, JwtOptions opts)
    {
        services.AddScoped<IAccountsService, AccountsService>();
        services.AddScoped<IJwtService, JwtService>(
            o => new JwtService(o.GetRequiredService<UserManager<UserEntity>>(), opts)
        );
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IBrandService, BrandService>();
        services.AddScoped<IAmountService, AmountService>();
        services.AddScoped<IRoleService, RoleService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<ICartService, CartService>();
        services.AddScoped<ICheckoutService, CheckoutService>();
        services.AddScoped<IDeliveryService, DeliveryService>();
        services.AddScoped<IPieceService, PieceService>();
        services.AddScoped<IRatingService, RatingService>();
        services.AddScoped<IFavoritesService, FavoritesService>();
    }

    public static void AddSearchService(this IServiceCollection services, string indexPath)
    {
        Directory.CreateDirectory(indexPath);
        services.AddScoped<ISearchService<ProductEntity, ProductDto>>(
            provider => new ProductSearchService(
                indexPath,
                provider.GetRequiredService<IRepository<ProductEntity>>(),
                provider.GetRequiredService<IMapper>()
            )
        );
    }
}
