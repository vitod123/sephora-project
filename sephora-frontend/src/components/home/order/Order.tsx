import React from "react";
import {Box, CircularProgress, Container, Grid, Stack, Typography} from "@mui/material";
import "./order.scss";
import {useTranslation} from "react-i18next";
import OrderProduct from "../products/orderProduct/OrderProduct";
import OrderBuyer from "./orderBuyer/OrderBuyer";
import OrderDelivery from "./orderDelivery/OrderDelivery";
import {CalculateProductTotal} from "../../../common/calculateTotal";
import {useSelector} from "react-redux";
import {IAuthUser} from "../../auth/types";
import {RootState} from "../../../store/store.ts";
import PagedList, {EmptyPagedList} from "../../../models/pagedlist/PagedList.ts";
import http_common from "../../../http_common.ts";
import CartItem from "../../../models/Cart/CartItem.ts";

const Order = () => {
    const {t} = useTranslation();
    const [pieces, setPieces] = React.useState<PagedList<CartItem>>();
    const {isAuth} = useSelector((store: RootState) => store.auth as IAuthUser);

    React.useEffect(() => {
        if (isAuth) {
            http_common.get<PagedList<CartItem>>("/cart")
                .then(r => setPieces(r.data))
                .catch(console.error);
        } else {
            setPieces(
                localStorage.cart
                    ? JSON.parse(localStorage.cart)
                    : EmptyPagedList
            );
        }
    }, [setPieces, isAuth]);

    const total: number = CalculateProductTotal(pieces?.items);
    const discount = 0;

    return !pieces
        ? (
            <Stack sx={{alignItems: 'center', justifyContent: 'center', marginY: 10}}>
                <CircularProgress color="inherit"/>
            </Stack>
        )
        : (
            <Container
                className="containerOrder"
                style={{maxWidth: "90%", justifyContent: "center", margin: '60px'}}
            >
                <Grid container justifyContent='space-between' spacing={3}>
                    <Grid item sm={12} lg={6} className='boxOrder' marginBottom='auto'>
                        <Typography className="title">{t('order.yourOrder')}</Typography>
                        <Stack spacing={2} sx={{margin: '8px'}} className="containerScroll">
                            {pieces.items.map((piece) => (
                                <OrderProduct piece={piece} key={piece.id}/>
                            ))}
                        </Stack>
                        <Stack padding={2} className="containerTotalOrder">
                            <Stack
                                margin='0 15px'
                                justifyContent='space-between' direction='row'>
                                <Typography className="text">{t('basket/order.orderAmount')}</Typography>
                                <Typography className="text">{total} {t('uah')} </Typography>
                            </Stack>
                            <Stack
                                margin='15px'
                                justifyContent='space-between' direction='row'>
                                <Typography className="text">{t('basket/order.discount')}</Typography>
                                <Typography className="text">{discount} {t('uah')} </Typography>
                            </Stack>
                            <Box className='line'/>
                            <Stack
                                margin='15px'
                                justifyContent='space-between' direction='row'>
                                <Typography className="total">{t('basket/order.total')}</Typography>
                                <Typography className="total">{total - discount} {t('uah')} </Typography>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid item sm={12} lg={6}>
                        {
                            isAuth
                                ? <OrderDelivery/>
                                : <OrderBuyer/>
                        }
                    </Grid>
                </Grid>
            </Container>
        );
}

export default Order;
