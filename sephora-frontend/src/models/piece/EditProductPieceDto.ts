export default interface EditProductPieceDto {
    get id(): number;

    get inStock(): number | null;

    get price(): number;

    get amountId(): number;

    get isBottledParfume(): boolean;
}
