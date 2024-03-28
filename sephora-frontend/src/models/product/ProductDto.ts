import BrandDto from "../brand/BrandDto.ts";
import RatingDto from "../rating/RatingDto.ts";
import ProductPieceDto from "../piece/ProductPieceDto.ts";
import AmountDto from "../amount/AmountDto.ts";
import CategoryDto from "../category/CategoryDto.ts";
import CharacteristicDto from "../characteristics/CharacteristicDto.ts";

export default interface ProductDto {
    get id(): number;

    get name(): string | null;

    get descriptionEn(): string;

    get descriptionUa(): string;

    get active(): boolean;

    get brand(): BrandDto;

    get category(): CategoryDto;

    get pieces(): ProductPieceDto[];

    get ratings(): RatingDto[];

    get averageRating(): number;

    get volumes(): AmountDto[];

    get characteristics(): CharacteristicDto[];

    get createdAt(): Date;

    get isNew(): boolean;

    get isFavorite(): boolean;
}
