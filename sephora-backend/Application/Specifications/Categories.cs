namespace CleanArchitecture.Application.Specifications;

public static class Categories
{
    public class GetById : Specification<Category>
    {
        public GetById(int id)
        {
            Query.Where(x => x.Id == id);
        }
    }
}