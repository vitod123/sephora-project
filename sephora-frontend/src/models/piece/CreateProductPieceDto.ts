export default interface CreateProductPieceDto {
    get productId(): number;
    get inStock(): number | null;
    get price(): number;
    get amountId(): number;
    get isBottledParfume(): boolean;
    get productPictures() : File[];
}
