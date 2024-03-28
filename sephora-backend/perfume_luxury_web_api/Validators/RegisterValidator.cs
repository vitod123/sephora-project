namespace perfume_luxury_web_api.Validators;

public class RegisterValidator : AbstractValidator<RegisterDto>
{
    public RegisterValidator()
    {

        RuleFor(x => x.Password)
            .NotEmpty();

        RuleFor(x => x.Email)
            .NotEmpty()
            .MinimumLength(2);
            
        RuleFor(x => x.PhoneNumber)
            .MinimumLength(2);
            
    }
}
