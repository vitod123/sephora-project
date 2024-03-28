export default interface CreateDeliveryDto {
    get address(): string;

    get provider(): string;

    get postalCode(): string | null;

    get region(): string | null;

    get district(): string | null;

    get city(): string | null;

    get street(): string | null;

    get building(): string | null;

    get apartment(): string | null;

    get novaPostWarehouse(): string | null;
}
