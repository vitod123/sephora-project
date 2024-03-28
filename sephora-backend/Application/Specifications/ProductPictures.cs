namespace CleanArchitecture.Application.Specifications;

public class ProductPictures
{
    public class GetByPieceId : Specification<ProductPicture>
    {
        public GetByPieceId(long pieceId)
        {
            Query.Where(x => x.ProductPieceId == pieceId);
        } 
    }
    
    public class GetByPieceIds : Specification<ProductPicture>
    {
        public GetByPieceIds(IEnumerable<long> pieceIds)
        {
            Query.Where(x => pieceIds.Contains(x.ProductPieceId));
        } 
    }
    
    public class GetByPath : Specification<ProductPicture>
    {
        public GetByPath(string path)
        {
            Query.Where(x => x.PicturePath == path);
        } 
    }
}
