import PictureDto from "../picture/PictureDto.ts";

export default interface CategoryDto {
    get id(): number;

    get nameEn(): string;

    get nameUa(): string;

    get descriptionEn(): string;

    get descriptionUa(): string;

    get picture(): PictureDto;
}
