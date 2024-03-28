export default interface EditUnauthedUserDto {
    get id(): number;

    get firstName(): string;

    get lastName(): string;

    get phoneNumber(): string;

    get email(): string;

    get deliveryDataId(): number | null;
}
