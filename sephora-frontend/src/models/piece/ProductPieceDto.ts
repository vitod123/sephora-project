import PictureDto from "../picture/PictureDto.ts";
import ProductDto from "../product/ProductDto.ts";

export default interface ProductPieceDto {
    get id(): number;
    get inStock(): number;
    get price(): number;
    get milliliters(): number;
    get isBottledParfume(): boolean;
    get product(): ProductDto;
    get pictures(): PictureDto[];

    get createdAt(): Date;
    get isNew(): boolean;
}
