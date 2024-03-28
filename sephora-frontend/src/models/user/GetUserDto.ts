import RatingDto from "../rating/RatingDto.ts";
import OrderDto from "../order/OrderDto.ts";
import PictureDto from "../picture/PictureDto.ts";
import CartItem from "../Cart/CartItem.ts";

export default interface GetUserDto {
    get id(): string;

    get firstName(): string;

    get lastName(): string;

    get email(): string;

    get profilePicture(): PictureDto | null;

    get phoneNumber(): string | null;

    get roles(): string[];

    get registrationDate(): Date;

    get ratings(): RatingDto[];

    get orders(): OrderDto[];

    get cartItems(): CartItem[];
}
