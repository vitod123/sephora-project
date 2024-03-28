import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { IRecCategory } from "./types";
import "./recCategories.scss";

const RecCategories: React.FC<{title: string; categories: IRecCategory[]}> 
                              = ({ title, categories }) => {
  
  return (
    <Container className="recCategories" style={{ maxWidth: "100%", justifyContent: "center" }}>
      <Typography className="title">{title}</Typography>

      <Container sx={{ pt: 8, m: 0 }} style={{ maxWidth: "100%" }}>
        <Grid container spacing={2.5}>
          {Array.isArray(categories) && categories.map((category, index) => (
            <Grid item lg={3} key={index}>
              <Button className="categories" variant="outlined" href={category.link}>
                {category.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

export default RecCategories;
