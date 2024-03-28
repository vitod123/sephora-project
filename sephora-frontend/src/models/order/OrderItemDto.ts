import ProductPieceDto from "../piece/ProductPieceDto.ts";

export default interface OrderItemDto {
    get id(): number;
    get productPiece(): ProductPieceDto;
    get quantity(): number;
    get orderId(): number;
}
