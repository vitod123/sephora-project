using Directory = System.IO.Directory;

namespace CleanArchitecture.Application.Services.Implementations;

public class PhysicalPictureService : IPictureService
{
    private const string WebpExt = "webp";

    private static readonly string[] SizesPaths
        = ["original", "1000x1000", "500x500", "150x150", "50x50"];

    private static readonly Size[] Sizes =
    [
        new Size(1000, 1000),
        new Size(500, 500),
        new Size(150, 150),
        new Size(50, 50),
    ];

    private string ContentPath { get; }

    public PhysicalPictureService(string contentPath)
    {
        ContentPath = contentPath + "/img";

        // Ensure subdirectories for different sizes exist
        foreach (string s in SizesPaths)
            Directory.CreateDirectory(Path.Combine(ContentPath, s));
    }

    public async Task<string> SaveImage(IFormFile file)
    {
        await using Stream stream = file.OpenReadStream();
        return await SaveImage(stream);
    }

    public async Task<string> SaveImage(byte[] file)
    {
        await using Stream stream = new MemoryStream(file);
        return await SaveImage(stream);
    }

    public async Task<string> SaveImage(Stream file)
    {
        // Prepare the image (load & generate file name)
        using Image image = await Image.LoadAsync(file);
        string fileName = GenerateFileName();

        // Save original image as webp
        await SaveImageBySize(image, fileName, image.Size, SizesPaths[0]);

        // Save resized images
        for (int i = 0; i < Sizes.Length; i++)
            await SaveImageBySize(image, fileName, Sizes[i], SizesPaths[i + 1]);

        return fileName;
    }

    private async Task SaveImageBySize(
        Image image,
        string fileName,
        Size size,
        string sizeFolder
    )
    {
        // Resize image
        ResizeOptions opts = new()
        {
            Size = size,
            Mode = ResizeMode.Max
        };
        image.Mutate(context => context.Resize(opts));

        // Save the image
        string fullPath = Path.Combine(ContentPath, sizeFolder, fileName);
        await image.SaveAsWebpAsync(fullPath);
    }

    public Stream GetFile(string name) => GetFile(name, SizesPaths[0]);

    public Stream GetFile(string name, string size)
        => new FileStream(
            Path.Combine(ContentPath, size, name),
            FileMode.Open, FileAccess.Read, FileShare.Read
        );

    public byte[] GetFileBytes(string name) => GetFileBytes(name, SizesPaths[0]);

    public byte[] GetFileBytes(string name, string size)
        => File.ReadAllBytes(Path.Combine(ContentPath, size, name));

    public void DeleteFile(string? name)
    {
        if (name is null || !FileExists(name)) return;

        foreach (string s in SizesPaths)
            File.Delete(Path.Combine(ContentPath, s, name));
    }

    public bool FileExists(string? name)
        => name is not null && 
           File.Exists(Path.Combine(ContentPath, SizesPaths[0], name));

    public bool SizeExists(string? size)
        => SizesPaths.Contains(size);

    /**
     * <summary>Generate a unique file name</summary>
     * <param name="extension">The file extension</param>
     * <returns>The unique file name</returns>
     */
    private static string GenerateFileName(string extension = WebpExt)
        => $"{Guid.NewGuid()}.{extension}";
}
