namespace CleanArchitecture.Application.Dtos.Picture;

public class PictureDto(string name, bool isDevelopment = false)
{
    private static readonly string[] SizesPaths
        = ["original", "1000x1000", "500x500", "150x150", "50x50"];
    
    private static string Domain(bool isDevelopment) 
        => isDevelopment
        ? "http://localhost:5156/assets/img"
        : "https://api.luxuryhub.tech/assets/img";

    public string Name { get; } = name;
    
    public string Url { get; } 
        = $"{Domain(isDevelopment)}/{name}";
    public string UrlLg { get; } 
        = $"{Domain(isDevelopment)}/{name}?size={SizesPaths[1]}";
    public string UrlMd { get; } 
        = $"{Domain(isDevelopment)}/{name}?size={SizesPaths[2]}";
    public string UrlSm { get; } 
        = $"{Domain(isDevelopment)}/{name}?size={SizesPaths[3]}";
    public string UrlXs { get; } 
        = $"{Domain(isDevelopment)}/{name}?size={SizesPaths[4]}";
    
    public static string GetUrl(string name, int size, bool isDevelopment = true)
        => $"{Domain(isDevelopment)}/{name}?size={SizesPaths[size]}";
}
