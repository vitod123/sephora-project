import DeliveryDto from "../delivery/DeliveryDto.ts";

export default interface UnauthedUserDto {
    get id(): number;

    get userName(): string;

    get phoneNumber(): string;

    get email(): string;

    get deliveryData(): DeliveryDto;
}
