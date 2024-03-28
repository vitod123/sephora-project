import {Button, CircularProgress, Container, Grid, Stack, Typography} from "@mui/material";
import "./products.scss"
import Product from "./Product";
import {useTranslation} from "react-i18next";
import React, {useEffect} from "react";
import http_common from "../../../http_common.ts";
import ProductDto from "../../../models/product/ProductDto.ts";

const pageSize = 4;

const Products: React.FC<{
    title: string,
    link: string,
    linkBut: string
}> = ({title, link, linkBut}) => {
    const {t} = useTranslation();

    const [products, setProducts] = React.useState<ProductDto[]>([]);

    // TODO: paging
    useEffect(() => {
        http_common.get(`${link}&page=${1}&size=${pageSize}`)
            .then(r => setProducts([...products, ...r.data.items]))
            .catch(console.error);
    }, [link]);

    return (
        <Container
            className="containerProductsMP"
            style={{maxWidth: "100%", justifyContent: "center"}}>
            <Typography className="title">{title}</Typography>

            <Container sx={{pt: 5, pb: 4, m: 0}} style={{maxWidth: "100%"}}>
                <Grid container spacing={2}>
                    {products.length > 0 ?
                        products.map((product) => (
                            <Grid key={product.id} item xs={6} sm={6} md={4} lg={3}>
                                <Product key={product.id} product={product}/>
                            </Grid>
                        ))
                        : <Grid item xs={12}>
                            <Stack sx={{alignItems:'center', justifyContent:'center', marginY:4}}>
                            <CircularProgress color="inherit"/>
                            </Stack>
                        </Grid>
                    }
                </Grid>
            </Container>

            <Stack>
                <Button className='link'
                    href={linkBut}>
                    {t('common.button.moreProducts')}
                </Button>
            </Stack>
        </Container>
    );
}

export default Products;
