import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate, useSearchParams} from "react-router-dom";
import routes from "../../../common/routes.ts";
import PagedList from "../../../models/pagedlist/PagedList.ts";
import http_common from "../../../http_common.ts";
import {Button, CircularProgress, Container, Grid, Pagination, Stack, Typography} from "@mui/material";
import Product from "../products/Product.tsx";
import ProductDto from "../../../models/product/ProductDto.ts";

const Search: React.FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [params] = useSearchParams();
    const q = params.get('q'), link = routes.api.search + q;
    if (typeof q === "undefined" || q === null || q.trim().length === 0)
        navigate('/');

    const [products, setProducts] = useState<PagedList<ProductDto>>();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        http_common.get<PagedList<ProductDto>>(
            `${link}&size=10&page=${currentPage}`
        )
            .then(r => setProducts(r.data))
            .catch(console.error);
    }, [currentPage, link]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return products
        ? (
            <Container className="productsPage"
                       style={{maxWidth: "100%", justifyContent: "center"}}>
                <Stack
                    direction='row'
                    className="navigate"
                    alignItems='center'
                    sx={{padding: "40px 8px"}}>
                    <Button
                        disableTouchRipple
                        href={routes.home}
                        style={{color: "#646464"}}>
                        {t('main')}
                    </Button>
                    /
                    <Button
                        disableTouchRipple
                        href={routes.search}>
                        {t('search')}
                    </Button>
                </Stack>
                <Grid item lg={9}>
                    <Container style={{maxWidth: "100%", justifyContent: "center"}}>
                        <Typography className="title">{t('search')}</Typography>
                        <Container sx={{height: '50px', mt: 5, position: "relative"}}>
                            <Stack sx={{
                                position: "absolute",
                                top: 0,
                                right: 25,
                                zIndex: 1,
                            }}
                            >
                            </Stack>
                        </Container>

                        <Container sx={{pt: 3, pb: 4, m: 0}} style={{maxWidth: "100%"}}>
                            <Grid container spacing={2}>
                                {products?.items?.map((product, i) =>
                                    product.pieces?.length > 0 &&
                                    <Grid key={i} item xs={12} sm={6} lg={4}>
                                        <Product product={product}/>
                                    </Grid>
                                )}
                            </Grid>
                        </Container>
                        <Stack sx={{margin: '40px', alignItems: 'center'}}>
                            <Pagination
                                sx={{display: 'flex'}}
                                count={products?.totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </Stack>
                    </Container>
                </Grid>
            </Container>
        )
        : (
            <Stack sx={{alignItems: 'center', justifyContent: 'center', marginY: 10}}>
                <CircularProgress color="inherit"/>
            </Stack>
        );
}

export default Search;
