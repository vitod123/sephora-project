export default interface SortingOrder {
    get key(): string;
    get value(): string;
}

export const Orders: SortingOrder[] = [
    {
        key: 'sortBy.price',
        value: 'price'
    },
    {
        key: 'sortBy.popularity',
        value: 'AverageRating'
    },
    {
        key: 'sortBy.date',
        value: 'createdAt'
    },
]
export const Directions: SortingOrder[] = [
    {
        key: 'sortBy.toLow',
        value: 'desc'
    },
    {
        key: 'sortBy.toHigh',
        value: 'asc'
    },
]
