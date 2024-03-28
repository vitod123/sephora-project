namespace CleanArchitecture.Application.Specifications;

public static class CartItems
{
    public class GetByUserId : Specification<CartItem>
    {
        public GetByUserId(string userId)
        {
            Query
                .Where(x => x.UserId == userId)
                .Include(x => x.User)
                .Include(x => x.ProductPiece)
                .Include(x => x.ProductPiece.Product)
                .Include(x => x.ProductPiece.ProductPictures)
                .Include(x => x.ProductPiece.Amount);
        }
    }

    public class GetByUserAndPiece : Specification<CartItem>
    {
        public GetByUserAndPiece(string userId, long pieceId)
        {
            Query
                .Where(x =>
                    x.UserId == userId
                    && x.ProductPiece.Id == pieceId
                )
                .Include(x => x.User)
                .Include(x => x.ProductPiece)
                .Include(x => x.ProductPiece.Product)
                .Include(x => x.ProductPiece.ProductPictures)
                .Include(x => x.ProductPiece.Amount);
        }
    }

    public class GetAll : Specification<CartItem>
    {
        public GetAll()
        {
            Query
                .Include(x => x.User)
                .Include(x => x.ProductPiece)
                .Include(x => x.ProductPiece.Product)
                .Include(x => x.ProductPiece.ProductPictures)
                .Include(x => x.ProductPiece.Amount);
        }
    }
    
    public class GetById : Specification<CartItem>
    {
        public GetById(long id)
        {
            Query
                .Where(x => x.Id == id)
                .Include(x => x.User)
                .Include(x => x.ProductPiece)
                .Include(x => x.ProductPiece.Product)
                .Include(x => x.ProductPiece.ProductPictures)
                .Include(x => x.ProductPiece.Amount);
        }
    }
}
