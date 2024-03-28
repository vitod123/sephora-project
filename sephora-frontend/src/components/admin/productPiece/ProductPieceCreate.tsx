import React, { ChangeEvent, useState } from "react";
import {
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Button,
  ImageList,
  ImageListItem,
  IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import AmountDto from "../../../models/amount/AmountDto";
import CreateProductPieceDto from "../../../models/piece/CreateProductPieceDto";

interface CreateProductPieceFormProps {
  productPieces: CreateProductPieceDto[];
  setProductPieces: React.Dispatch<
    React.SetStateAction<CreateProductPieceDto[]>
  >;
  handlePieceChange: (
    index: number,
    fieldName: string
  ) => (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => void;
  handleSelectorPieceChange: (index: number) => (value: number) => void;
  addProductPiece: () => void;
  handleImageChange: (index: number, images: File[]) => void;
  amounts: AmountDto[];
  setProductPiecePictures: (index: number, pictures: File[]) => void;
}

const CreateProductPieceForm: React.FC<CreateProductPieceFormProps> = ({
  productPieces,
  handlePieceChange,
  handleSelectorPieceChange,
  addProductPiece,
  handleImageChange,
  setProductPiecePictures,
  amounts,
}) => {
  // State to track selected images for each product piece
  const [selectedImages, setSelectedImages] = useState<File[][]>(
    new Array(productPieces.length).fill([])
  );

  const handleFileChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages(prevSelectedImages => {
        const updatedSelectedImages = [...prevSelectedImages];
        updatedSelectedImages[index] = files;
        return updatedSelectedImages;
      });
      setProductPiecePictures(index, files); // Update productPictures in parent component
      handleImageChange(index, files);
    }
  };

  const removeImage = (index: number, imageIndex: number) => {
    const updatedImages = [...selectedImages];
    updatedImages[index].splice(imageIndex, 1);
    setSelectedImages(updatedImages);
    handleImageChange(index, updatedImages[index]);
  };

  return (
    <>
      {/* Add product piece button */}
      <Grid item xs={12}>
        <Button onClick={addProductPiece} variant="contained" color="primary">
          Add Product Piece
        </Button>
      </Grid>
      {/* Product piece fields */}
      {productPieces.map((piece, index) => (
        <Grid item xs={12} key={index}>
          <Typography variant="h6" gutterBottom>
            Product Piece #{index + 1}
          </Typography>
          {/* In Stock field */}
          <TextField
            label="In Stock"
            fullWidth
            value={piece.inStock}
            onChange={handlePieceChange(index, "inStock")}
            name={`productPieces[${index}].inStock`}
            variant="outlined"
          />
          <TextField
            margin="normal"
            label="Price"
            fullWidth
            value={piece.price || ""}
            onChange={handlePieceChange(index, "price")}
            name={`productPieces[${index}].price`}
            variant="outlined"
          />
          {/* Amount field */}
          <Typography variant="subtitle1" gutterBottom>
            Amount
          </Typography>
          <Select
            value={piece.amountId}
            onChange={(e) =>
              handleSelectorPieceChange(index)(e.target.value as number)
            }
            name={`productPieces[${index}].amountId`}
            fullWidth
            variant="outlined"
          >
            {amounts.map((amount) => (
              <MenuItem key={amount.id} value={amount.id}>
                {amount.milliliters} ml
              </MenuItem>
            ))}
          </Select>

          {/* Image List */}
          <Typography variant="subtitle1" gutterBottom>
            Product Images
          </Typography>
          <ImageList cols={3}>
            {selectedImages[index]?.map((image, imageIndex) => (
              <ImageListItem key={imageIndex}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Product Image ${imageIndex + 1}`}
                />
                <IconButton
                  onClick={() => removeImage(index, imageIndex)}
                  sx={{ position: "absolute", top: 2, right: 2 }}
                >
                  <CloseIcon />
                </IconButton>
              </ImageListItem>
            ))}
            <ImageListItem>
              <label htmlFor={`image-input-${index}`}>
                <IconButton component="span">
                  <AddPhotoAlternateIcon />
                </IconButton>
              </label>
              <input
                id={`image-input-${index}`}
                name = {`productPieces[${index}].productPictures`}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) =>{ handleFileChange(index, e); console.log(productPieces[index].productPictures)}}
              />
            </ImageListItem>
          </ImageList>
        </Grid>
      ))}
    </>
  );
};

export default CreateProductPieceForm;
