export default interface EditRatingDto {
    get id(): number;

    get comment(): string | null;

    get rate(): number; // 1-5

    get updatedAt(): Date;
}
