export default interface CartItem {
    get id(): number;

    get productId(): number;

    get productPieceId(): number;

    get productName(): string;

    get productDescriptionEn(): string;

    get productDescriptionUa(): string;

    get productImage(): string;

    get brandName(): string;

    get categoryNameEn(): string;

    get categoryNameUa(): string;

    get quantity(): number;

    get milliliters(): number;

    get price(): number;

    get discount(): number | null;

    get tax(): number | null;

    get total(): number;
}
