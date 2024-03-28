import OrderDto from "../models/order/OrderDto";
import CartItem from "../models/Cart/CartItem.ts";
import ProductPieceDto from "../models/piece/ProductPieceDto.ts";

export function CalculateOrderTotal(order: OrderDto): number {
    return order.products.reduce(
        (acc, piece) => acc + piece.productPiece.price * piece.quantity, 0
    );
}

export function CalculateProductTotal(
    pieces: ProductPieceDto[] | CartItem[] | undefined
): number {
    return pieces ? pieces.reduce((acc, piece) => acc + piece.price, 0) : 0;
}
