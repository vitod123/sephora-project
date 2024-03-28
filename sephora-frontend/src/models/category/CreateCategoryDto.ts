export default interface CreateCategoryDto {
    get nameEn(): string;

    get nameUa(): string;

    get descriptionEn(): string;

    get descriptionUa(): string;

    get picture(): File;
}
