import {CircularProgress, Grid, Pagination, Stack} from "@mui/material";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import http_common from "../../../../http_common";
import Product from "../../products/Product";
import PagedList from "../../../../models/pagedlist/PagedList.ts";
import ProductDto from "../../../../models/product/ProductDto.ts";

const itemsPerPage = 12;

const Wishlist = () => {
    const {t} = useTranslation();
    const [products, setProducts] = useState<PagedList<ProductDto>>();

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        http_common.get<PagedList<ProductDto>>(
            `/favorites?page=${currentPage}&size=${itemsPerPage}`
        ).then(response => {
            const data = response.data;
            for (const product of data.items) {
                for (let i = 0; i < product.pieces.length; i++) {
                    product.pieces[i] = {...product.pieces[i], product: product};
                }
            }
            setProducts(data);
        }).catch(console.error);
    }, [currentPage]);

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        page: number
    ) => setCurrentPage(page);

    return products
        ? (
            <Stack className="wishlist" style={{justifyContent: "center", margin: "7rem 10% 2rem 10%"}}>
                {products?.items?.length > 0
                    ? (
                        <Stack justifyContent="center">
                            <Stack sx={{pb: 4, m: 0}}>
                                <Grid container spacing={2}>
                                    {products.items.map((product) =>
                                        product.pieces[0] && (
                                            <Grid key={product.id} item xs={12} sm={6} lg={3}>
                                                <Product product={product}/>
                                            </Grid>
                                        ))}
                                </Grid>
                            </Stack>

                            <Stack sx={{margin: '40px', alignItems: 'center'}}>
                                <Pagination
                                    sx={{display: 'flex'}}
                                    count={products.totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}/>
                            </Stack>
                        </Stack>
                    ) : (
                        <Stack className="listIsEmpty" alignItems='center'>
                            {t('profile.wishlist.listIsEmpty')}
                        </Stack>
                    )
                }
            </Stack>
        )
        : (
            <Stack sx={{alignItems: 'center', justifyContent: 'center', marginY: 10}}>
                <CircularProgress color="inherit"/>
            </Stack>
        )
}

export default Wishlist;
