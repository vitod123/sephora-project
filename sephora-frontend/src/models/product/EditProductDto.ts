import CharacteristicDto from "../characteristics/CharacteristicDto";

export default interface EditProductDto {
    get id(): number;

    get name(): string | null;

    get descriptionEn(): string;

    get descriptionUa(): string;

    get active(): boolean;

    get brandId(): number;

    get categoryId(): number;

    get characteristics(): CharacteristicDto[];

    get deletedCharacteristics(): number[];
}
