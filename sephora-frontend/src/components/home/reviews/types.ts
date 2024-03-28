export interface IMPReview{
    userName:string;
    rating:number;    
    review:string;
    userImage:string;
    productImage:string;
    productName:string;
    productCategory:string;
}

export interface IReview{
    userName:string;
    rating:number;    
    review:string;
    userImage:string|null;
    date:string|null;
}