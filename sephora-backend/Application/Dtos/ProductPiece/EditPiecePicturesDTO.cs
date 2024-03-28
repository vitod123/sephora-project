namespace CleanArchitecture.Application.Dtos.ProductPiece;

public class AddPiecePicturesDto
{
    public long PieceId { get; set; }
    public IEnumerable<IFormFile> Pictures { get; set; } = [];
}

public class DeletePiecePicturesDto
{
    public long PieceId { get; set; }
    public IEnumerable<string> PictureNames { get; set; } = [];
}
