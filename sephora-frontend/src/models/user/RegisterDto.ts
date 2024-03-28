export default interface RegisterDto {
    get userName(): string;

    get firstName(): string;

    get lastName(): string;

    get email(): string;

    get phoneNumber(): string;

    get password(): string;

    get passwordConfirmation(): string;

    get profilePicture(): File | null;
}
