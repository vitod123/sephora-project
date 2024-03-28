namespace CleanArchitecture.Application.Helpers;

[Serializable]
public class HttpException : Exception
{
    public HttpStatusCode StatusCode { get; set; }

    public HttpException() { }
    public HttpException(string message, HttpStatusCode code) 
        : base(message) => StatusCode = code;
    public HttpException(string message, HttpStatusCode code, Exception inner)
        : base(message, inner) => StatusCode = code;
}
