import CreateCharacteristicDto from "../characteristics/CreateCharacteristicDto.ts";

export default interface CreateProductDto {
    get name(): string;

    get descriptionEn(): string;

    get descriptionUa(): string;

    get active(): boolean;

    get brandId(): number;

    get categoryId(): number;

    get characteristics(): CreateCharacteristicDto[];
}
