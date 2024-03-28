import CreateCartItem from "../Cart/CreateCartItem.ts";
import CreateDeliveryDto from "../delivery/CreateDeliveryDto.ts";

export default interface CheckoutDto {
    get cartItems(): CreateCartItem[];
    get deliveryDto(): CreateDeliveryDto;
}
