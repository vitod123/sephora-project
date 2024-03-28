import {Button, Link, Stack, Typography} from "@mui/material";
import "./orderProduct.scss";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import i18n from "i18next";
import routes from "../../../../common/routes.ts";
import CartItem from "../../../../models/Cart/CartItem.ts";

const OrderProduct: React.FC<{ piece: CartItem }>
    = ({piece}) => {
    const {t} = useTranslation();

    const [count, setCount] = useState(1);
    const handleCountChange = (count: number) => {
        if (count != 0)
            setCount(count);
    };
    return (
        <Stack
            className="orderProduct"
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            padding={'20px 12px'}
        >
            <Stack spacing={2} direction='row'>
                <Link href={'/details/' + piece.id} underline="none">
                    <Stack width='80px' alignItems='center'>
                        <img className="productImg"
                             src={piece.productImage ?? routes.picPlaceholder}
                             alt="Product image"/>
                    </Stack>
                </Link>
                <Stack justifyContent='space-between'>
                    <Link href={'/details/' + piece.id} underline="none">
                        <Typography className="productName">
                            {piece.productName}
                        </Typography>
                        <Typography className="productCategory">
                            {
                                i18n.language === "en"
                                    ? piece.categoryNameEn
                                    : piece.categoryNameUa
                            }
                        </Typography>
                        <Typography className="productCategory">
                            {piece.milliliters} {t('common.ml')}
                        </Typography>
                        <Typography className="productPrice">
                            {piece.price} {t('uah')}
                        </Typography>
                    </Link>
                    <Stack direction='row' className="count" alignItems='center'>
                        <Button onClick={() => (handleCountChange(count - 1))}><RemoveIcon className="img"/></Button>
                        <Typography className="text">{count}</Typography>
                        <Button onClick={() => (handleCountChange(count + 1))}><AddIcon className="img"/></Button>
                    </Stack>
                </Stack>
            </Stack>

            <Button>
                <DeleteOutlinedIcon sx={{color: '#646464'}}/>
            </Button>
        </Stack>
    );
}

export default OrderProduct;
