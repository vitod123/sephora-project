export default interface EditCategoryDto {
    get id(): number;

    get nameEn(): string;

    get nameUa(): string;

    get descriptionEn(): string;

    get descriptionUa(): string;

    get picture(): File | null;
}
