namespace CleanArchitecture.Application.Services.Interfaces;

/**
 * <summary>
 * The picture service.
 * </summary>
 */
public interface IPictureService
{
    /**
     * <summary>Save a file to the file system</summary>
     * <param name="file">The file from an HTTP form to save</param>
     * <returns>The name of the saved image</returns>
     */
    Task<string> SaveImage(IFormFile file);

    /**
     * <summary>Save a file to the file system</summary>
     * <param name="file">The file bytes to save</param>
     * <returns>The name of the saved picture</returns>
     */
    Task<string> SaveImage(byte[] file);

    /**
     * <summary>Save a file to the file system</summary>
     * <param name="file">The file stream to save</param>
     * <returns>The name of the saved picture</returns>
     */
    Task<string> SaveImage(Stream file);

    /**
     * <summary>
     * Get a picture file stream from the file system
     * </summary>
     * <param name="name">The name of a picture</param>
     * <returns>The file stream</returns>
     */
    Stream GetFile(string name);
    
    /**
     * <summary>
     * Get a picture file stream (for a specific picture size)
     * from the file system
     * </summary>
     * <param name="name">The name of a picture</param>
     * <param name="size">The size of a picture</param>
     * <returns>The file stream</returns>
     */
    Stream GetFile(string name, string size);

    /**
     * <summary>
     * Get a picture as bytes from the file system
     * </summary>
     * <param name="name">The name of a picture</param>
     * <returns>The picture bytes</returns>
     */
    byte[] GetFileBytes(string name);
    
    /**
     * <summary>
     * Get a picture as bytes (for a specific picture size)
     * from the file system
     * </summary>
     * <param name="name">The name of a picture</param>
     * <param name="size">The size of a picture</param>
     * <returns>The picture bytes</returns>
     */
    byte[] GetFileBytes(string name, string size);

    /**
     * <summary>Delete a picture from the file system</summary>
     * <param name="name">The name of a picture</param>
     */
    void DeleteFile(string? name);

    /**
     * <summary>Check if a file exists in the file system</summary>
     * <param name="name">The name of a file</param>
     * <returns>Whether the file exists</returns>
     */
    bool FileExists(string? name);
    
    /**
     * <summary>Check if a size parameter is valid</summary>
     * <param name="size">The size of a picture</param>
     * <returns>Whether the size exists</returns>
     */
    bool SizeExists(string? size);
}
