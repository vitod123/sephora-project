export interface AddPiecePicturesDto {
    id: number;
    pictures: string[];
}

export interface DeletePiecePicturesDto {
    id: number;
    pictureNames: string[];
}
