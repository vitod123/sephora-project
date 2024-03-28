import {Link, Stack, Typography} from "@mui/material";
import "./orderProduct.scss";
import React from "react";
import {useTranslation} from "react-i18next";
import OrderItemDto from "../../../../models/order/OrderItemDto.ts";
import i18n from "i18next";
import routes from "../../../../common/routes.ts";

const OrderProduct: React.FC<{ orderItem: OrderItemDto }>
    = ({orderItem}) => {
    const {t} = useTranslation();

    return (
        <Stack
            className="orderProduct"
            padding={'10px 12px'}
        >
            <Link href={'/details/' + orderItem.productPiece.id} underline="none">
                <Stack spacing={4} direction='row' justifyContent='space-between'>
                    <Stack direction='row' spacing={1}>
                        <Stack width='95px' alignItems='center'>
                            <img className="productImg"
                                 alt='Product image'
                                 src={orderItem.productPiece.pictures[0].url ?? routes.picPlaceholder}
                            />
                        </Stack>
                        <Stack justifyContent='center'>
                            <Typography className="productName">
                                {orderItem.productPiece.product.name}
                            </Typography>
                            <Typography className="productCategory">
                                {
                                    i18n.language === "en"
                                        ? orderItem.productPiece.product.category.nameEn
                                        : orderItem.productPiece.product.category.nameUa
                                }
                            </Typography>
                            <Typography className="productCategory">
                                {orderItem.productPiece.milliliters} {t('common.ml')}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction='row' spacing={4} alignItems='center' justifyContent='space-between'
                           minWidth='150px'>
                        <Typography className="productPrice" sx={{fontWeight: 300}}>
                            {orderItem.quantity} {t('pc')}
                        </Typography>
                        <Typography className="productPrice" sx={{fontWeight: 500}}>
                            {orderItem.productPiece.price} {t('uah')}
                        </Typography>
                    </Stack>
                </Stack>
            </Link>
        </Stack>
    );
}

export default OrderProduct;
