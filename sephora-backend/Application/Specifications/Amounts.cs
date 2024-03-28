namespace CleanArchitecture.Application.Specifications;

public static class Amounts
{
    public class GetById : Specification<Amount>
    {
        public GetById(int id)
        {
            Query.Where(x => x.Id == id);
        }
    }
}