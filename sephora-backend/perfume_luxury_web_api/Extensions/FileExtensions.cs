namespace perfume_luxury_web_api.Extensions;

public static class FileExtensions
{
    public static IServiceCollection AddFileService(
        this IServiceCollection services,
        bool isDevelopment
    )
    {
        ArgumentNullException.ThrowIfNull(services);
        return services.AddScoped<IPictureService, PhysicalPictureService>(_ =>
            new PhysicalPictureService(GetContentPath(isDevelopment))
        );

        // Get the path of the content directory for different environments
        static string GetContentPath(bool isDevelopment)
        {
            string path;
            if (isDevelopment)
            {
                path = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
                Directory.CreateDirectory(path);
            }
            else path = Environment.GetEnvironmentVariable("WebRootPath")
                       ?? throw new ApplicationException("WebRootPath is null");
            return path;
        }
    }
}
