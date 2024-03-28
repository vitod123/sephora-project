import {Button, Link, Stack, Typography} from "@mui/material";
import "./basketProduct.scss";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import i18n from "i18next";
import routes from "../../../../common/routes.ts";
import CartItem from "../../../../models/Cart/CartItem.ts";
import http_common from "../../../../http_common.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store.ts";
import {IAuthUser} from "../../../auth/types.ts";
import {EmptyPagedList} from "../../../../models/pagedlist/PagedList.ts";

const BasketProduct: React.FC<{
    piece: CartItem,
    onUpdate: (() => void) | (() => Promise<void>)
}>
    = ({piece, onUpdate}) => {
    const {t} = useTranslation();

    const {isAuth} = useSelector((store: RootState) => store.auth as IAuthUser);

    const [count, setCount] = useState(piece.quantity);
    const handleCountChange = (count: number) => {
        if (count != 0) {
            setCount(count);

            if (isAuth) {
                http_common.put(`/cart`, {...piece, quantity: count})
                    .catch(console.error);
            } else {
                const cart = localStorage.cart
                    ? JSON.parse(localStorage.cart)
                    : EmptyPagedList;
                cart.items = cart.items.map((item: CartItem) => {
                    if (item.id === piece.id) {
                        return {...item, quantity: count};
                    }
                    return item;
                });
                localStorage.cart = JSON.stringify(cart);
            }
        } else handleDelete();
    };

    const handleDelete = () => {
        if (isAuth) {
            http_common.delete(`/cart/${piece.id}`)
                .then(onUpdate)
                .catch(console.error);
        } else {
            const cart = localStorage.cart
                ? JSON.parse(localStorage.cart)
                : EmptyPagedList;
            cart.items = cart.items.filter((item: CartItem) => item.id !== piece.id);
            localStorage.cart = JSON.stringify(cart);
            onUpdate();
        }
    }

    return (
        <Stack className="basketProduct"
               direction='row'
               justifyContent='space-between'
               alignItems='center'
               padding={'12px 20px'}>
            <Link href={'/details/' + piece.id} underline="none">
                <Stack spacing={2} direction='row'>
                    <Stack width='80px' alignItems='center'>
                        <img className="productImg"
                             src={piece.productImage ?? routes.picPlaceholder}
                             alt="Product image"/>
                    </Stack>

                    <Stack justifyContent='space-between'>
                        <Typography className="productName">
                            {piece.productName}
                        </Typography>
                        <Stack>
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
                        </Stack>
                    </Stack>
                </Stack>
            </Link>

            <Stack direction='row'
                   alignItems='center'
                   justifyContent='space-between'
                   minWidth='300px'>
                <Stack direction='row' className="count" alignItems='center'>
                    <Button onClick={() => (handleCountChange(count - 1))}>
                        <RemoveIcon className="img"/>
                    </Button>
                    <Typography className="text">{count}</Typography>
                    <Button onClick={() => (handleCountChange(count + 1))}>
                        <AddIcon className="img"/>
                    </Button>
                </Stack>
                <Typography className="productPrice">
                    {piece.price} {t('uah')}
                </Typography>
                <Button onClick={handleDelete}>
                    <DeleteOutlinedIcon sx={{color: '#646464'}}/>
                </Button>
            </Stack>
        </Stack>
    );
}

export default BasketProduct;
