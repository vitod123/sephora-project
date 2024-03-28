export default interface CreateRatingDto {
    get productId(): number;

    get comment(): string | null;

    get rate(): number; // 1-5
}
