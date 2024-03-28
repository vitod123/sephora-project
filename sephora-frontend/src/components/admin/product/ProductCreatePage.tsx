import { useState, useEffect, ChangeEvent } from "react";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import http_common from "../../../http_common.ts";
import CategoryDto from "../../../models/category/CategoryDto.ts";
import BrandDto from "../../../models/brand/BrandDto.ts";
import CreateProductPieceDto from "../../../models/piece/CreateProductPieceDto.ts";
import AmountDto from "../../../models/amount/AmountDto.ts";
import CreateProductPieceForm from "../productPiece/ProductPieceCreate.tsx";

const CreateProductPage = () => {
  const navigate = useNavigate();

  const [brands, setBrands] = useState<BrandDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [productPieces, setProductPieces] = useState<CreateProductPieceDto[]>(
    []
  );
  const [amounts, setAmounts] = useState<AmountDto[]>([]);

  useEffect(() => {
    // Fetch brands and categories from API
    http_common.get("/brands/all").then((resp) => {
      setBrands(resp.data);
    });
    http_common.get("/category/all").then((resp) => {
      setCategories(resp.data);
    });
    http_common.get("/amounts/all").then((resp) => {
      setAmounts(resp.data);
    });
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    descriptionEn: Yup.string().required("Description (English) is required"),
    descriptionUa: Yup.string().required("Description (Ukrainian) is required"),
    brandId: Yup.number().required("Brand is required"),
    categoryId: Yup.number().required("Category is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      descriptionEn: "",
      descriptionUa: "",
      brandId: "",
      categoryId: "",
      characteristics: [{ nameEn: "", nameUa: "", valueEn: "", valueUa: "" }],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await http_common.post("/products", values);
        const productId = response.data.id;

        for (const piece of productPieces) {
          const formData = new FormData();
          formData.append("productId", productId);
          formData.append("inStock", piece.inStock?.toString() || ""); // Handle null values
          formData.append("price", piece.price.toString());
          formData.append("amountId", piece.amountId.toString());
          formData.append(
            "isBottledParfume",
            piece.isBottledParfume.toString()
          );
          for (let i = 0; i < piece.productPictures.length; i++) {
            formData.append(`productPictures[${i}]`, piece.productPictures[i]);
          }

          await http_common.post(`/Pieces`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
        navigate("..");
      } catch (error) {
        console.error("Error while submitting form:", error);
        // Handle error appropriately, such as showing a toast message to the user
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  const handlePieceChange =
    (index: number, fieldName: string) =>
    (
      e: ChangeEvent<
        | HTMLInputElement
        | HTMLTextAreaElement
        | { name?: string; value: unknown }
      >
    ) => {
      const { value } = e.target;
      const updatedPieces = [...productPieces];
      updatedPieces[index] = {
        ...updatedPieces[index],
        [fieldName]: value,
      };
      setProductPieces(updatedPieces);
    };

  const handleSelectorPieceChange = (index: number) => (value: number) => {
    const updatedPieces = [...productPieces];
    updatedPieces[index] = { ...updatedPieces[index], amountId: value };
    setProductPieces(updatedPieces);
  };

  const addProductPiece = () => {
    const newPiece: CreateProductPieceDto = {
      productId: 0,
      inStock: null,
      price: 0,
      amountId: 0,
      isBottledParfume: false,
      productPictures: [],
    };
    setProductPieces([...productPieces, newPiece]);
  };

  const setProductPiecePictures = (index: number, pictures: File[]) => {
    const updatedPieces = [...productPieces];
    updatedPieces[index] = {...updatedPieces[index], productPictures: pictures};
    setProductPieces(updatedPieces);
  };

  const handleImageChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        setProductPiecePictures(index, files);
      }
    };
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                fullWidth
                value={values.name}
                onChange={handleChange}
                name="name"
                variant="outlined"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Description (English)"
                fullWidth
                value={values.descriptionEn}
                onChange={handleChange}
                name="descriptionEn"
                variant="outlined"
                error={touched.descriptionEn && !!errors.descriptionEn}
                helperText={touched.descriptionEn && errors.descriptionEn}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Description (Ukrainian)"
                fullWidth
                value={values.descriptionUa}
                onChange={handleChange}
                name="descriptionUa"
                variant="outlined"
                error={touched.descriptionUa && !!errors.descriptionUa}
                helperText={touched.descriptionUa && errors.descriptionUa}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                value={values.brandId}
                onChange={handleChange}
                displayEmpty
                name="brandId"
                fullWidth
                variant="outlined"
                error={touched.brandId && !!errors.brandId}
              >
                <MenuItem value="" disabled>
                  Select Brand
                </MenuItem>
                {Array.isArray(brands) &&
                  brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                value={values.categoryId}
                onChange={handleChange}
                displayEmpty
                name="categoryId"
                fullWidth
                variant="outlined"
                error={touched.categoryId && !!errors.categoryId}
              >
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.nameEn} / {category.nameUa}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {values.characteristics.map((char, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant="h6" gutterBottom>
                  Characteristic #{index + 1}
                </Typography>
                <TextField
                  label="Name (English)"
                  fullWidth
                  value={char.nameEn}
                  onChange={handleChange}
                  name={`characteristics[${index}].nameEn`}
                  variant="outlined"
                />
                <TextField
                  label="Name (Ukrainian)"
                  fullWidth
                  value={char.nameUa}
                  onChange={handleChange}
                  name={`characteristics[${index}].nameUa`}
                  variant="outlined"
                />
                <TextField
                  label="Value (English)"
                  fullWidth
                  value={char.valueEn}
                  onChange={handleChange}
                  name={`characteristics[${index}].valueEn`}
                  variant="outlined"
                />
                <TextField
                  label="Value (Ukrainian)"
                  fullWidth
                  value={char.valueUa}
                  onChange={handleChange}
                  name={`characteristics[${index}].valueUa`}
                  variant="outlined"
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <CreateProductPieceForm
                productPieces={productPieces}
                setProductPieces={setProductPieces}
                handlePieceChange={handlePieceChange}
                handleSelectorPieceChange={handleSelectorPieceChange}
                handleImageChange={handleImageChange}
                amounts={amounts}
                addProductPiece={addProductPiece}
                setProductPiecePictures={setProductPiecePictures}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateProductPage;
