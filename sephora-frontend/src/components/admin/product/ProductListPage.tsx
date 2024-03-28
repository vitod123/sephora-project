import { SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  MenuItem,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import http_common from "../../../http_common.ts";
import ProductDto from "../../../models/product/ProductDto.ts";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import i18n from "../../../i18n/i18n.ts";

const ProductListPage = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event: SetStateAction<any>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  useEffect(() => {
    http_common.get<ProductDto[]>("/products/all")
        .then((resp) => setProducts(resp.data));
  }, []);

  const onClickDelete = async (id: number) => {
    try {
      await http_common.delete(`/product/${id}`);
      setProducts(products.filter((x) => x.id !== id));
    } catch {
      console.error("Error deleting product");
    }
  };

  return (
    <>
    <div className="container">
      <Typography variant="h1" align="center" gutterBottom>
        Product List
      </Typography>
      <Link to="create">
        <Button variant="contained" color="success">
          Add Product
        </Button>
      </Link>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(products) &&
              products.map((product) => (
                <React.Fragment key={product.id}>
                  <TableRow>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      {i18n.language === "en"
                        ? product.name
                        : product.descriptionUa}
                    </TableCell>
                    <TableCell>
                      {i18n.language === "en"
                        ? product.descriptionEn
                        : product.descriptionUa}
                    </TableCell>
                    <TableCell>{product.brand.name}</TableCell>
                    <TableCell>{i18n.language === "en"
                        ? product.category.nameEn
                        : product.category.nameUa}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={handleOpenMenu}>
                        <MoreVertIcon />
                      </IconButton>
                      <Popover
                        open={!!open}
                        anchorEl={open}
                        onClose={handleCloseMenu}
                        anchorOrigin={{ vertical: "top", horizontal: "left" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        PaperProps={{
                          sx: { width: 140 },
                        }}
                      >
                        <MenuItem href={`edit/${product.id}`} onClick={handleCloseMenu}>
                          <EditIcon />
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleCloseMenu();
                            onClickDelete(product.id);
                          }}
                          sx={{ color: "error.main" }}
                        >
                          <DeleteIcon />
                          Delete
                        </MenuItem>
                      </Popover>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1c-content"
                          id="panel1c-header"
                        >
                          <Typography>Product Pieces</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Table size="small" aria-label="product-pieces">
                            <TableHead>
                              <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>In Stock</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Milliliters</TableCell>
                                <TableCell>Is Bottled Parfume</TableCell>
                                {/* Add more headers as needed */}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {product.pieces.map((piece) => (
                                <TableRow key={piece.id}>
                                  <TableCell>{piece.id}</TableCell>
                                  <TableCell>{piece.inStock}</TableCell>
                                  <TableCell>{piece.price}</TableCell>
                                  <TableCell>{piece.milliliters}</TableCell>
                                  <TableCell>{piece.isBottledParfume ? 'Yes' : 'No'}</TableCell>
                                  {/* Add more cells as needed */}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </>
  );
};

export default ProductListPage;
