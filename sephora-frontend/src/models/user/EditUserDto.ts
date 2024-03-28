export default interface EditUserDto {
    get userName(): string;

    get email(): string;

    get phoneNumber(): string;

    get ProfilePicture(): File | null;
}
