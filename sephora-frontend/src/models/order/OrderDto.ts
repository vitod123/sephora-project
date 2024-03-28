import OrderStatus from "./OrderStatus.ts";
import OrderItemDto from "./OrderItemDto.ts";

export default interface OrderDto {
    get id(): number;
    get date(): Date;
    get status(): OrderStatus;
    get deliveryId(): number;
    get products(): OrderItemDto[];
}
