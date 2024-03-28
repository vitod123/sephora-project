export default interface RatingDto {
    get id(): number;

    get comment(): string;

    get rate(): number;

    get userName(): string;

    get userPfp(): string;

    get createdAt(): Date;

    get updatedAt(): Date;
}
