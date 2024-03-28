namespace CleanArchitecture.Application.Specifications;

public static class Favorites
{
    public class Get : Specification<Favorite>
    {
        public Get(string userId, long productId)
        {
            Query.Where(x =>
                    x.UserId == userId &&
                    x.ProductId == productId
                )
                .Include(x => x.Product)
                .ThenInclude(p => p.ProductPieces);
        }
    }

    public class Find : Specification<Favorite>
    {
        public Find(string userId, long productId)
        {
            Query.Where(x =>
                    x.UserId == userId &&
                    x.ProductId == productId &&
                    x.IsActive)
                .Include(x => x.Product)
                .ThenInclude(p => p.ProductPieces);
        }
    }

    public class GetByProduct : Specification<Favorite>
    {
        public GetByProduct(long productId)
        {
            Query.Where(x =>
                    x.ProductId == productId &&
                    x.IsActive)
                .Include(x => x.Product)
                .ThenInclude(p => p.ProductPieces);
        }
    }

    public class GetByUser : Specification<Favorite>
    {
        public GetByUser(string userId)
        {
            Query.Where(x =>
                    x.UserId == userId &&
                    x.IsActive)
                .Include(x => x.Product)
                .ThenInclude(p => p.ProductPieces);
        }
    }
}
