namespace perfume_luxury_web_api.Validators;

public class LoginValidators : AbstractValidator<LoginDto>
{
    public LoginValidators()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .MinimumLength(2);

        RuleFor(x => x.Password)
            .NotEmpty();
    }
}