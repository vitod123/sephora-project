import OrderStatus from "./OrderStatus.ts";

export default interface ChangeStatusDto {
    get id(): number;
    get status(): OrderStatus;
}
