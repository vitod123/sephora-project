// export interface IProduct{
//     name:string;
//     categoryName:string;
//     volume:string|null;
//     price:string;
//     image:string;
//     rating:number;
//     isNew:boolean;
// }

import { IReview } from "../../reviews/types";
import ProductDto from "../../../../models/product/ProductDto.ts";

export interface IProduct{
    id:number;
    name:string;
    categoryName:string;
    isNew:boolean;
    volume:IVolume[];
    rating:number;
    description:string;
    characteristics:ICharasteristic[];
    codeProduct:number;
    reviews:IReview[];
    pictures:string[];
    product: ProductDto | null | undefined;
}

export interface ICharasteristic{
    name:string;
    characteristics:string[];
}

export interface IVolume{
    volume: string;
    price: string;
}
