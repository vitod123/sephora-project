import {Button, Card, CardMedia, FormControl, Link, MenuItem, Rating, Select, Stack, Typography} from "@mui/material";
import "./products.scss"
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import {useTranslation} from "react-i18next";
import routes from "../../../common/routes.ts";
import i18n from "i18next";
import changeFavStatus from "./ChangeFavStatus.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";
import textFieldStyle from '../../../common/textFieldStyle';
import FavoriteIcon from "@mui/icons-material/Favorite";
import ProductDto from "../../../models/product/ProductDto.ts";

function IsNew(isNew: boolean) {
    if (isNew) {
        return (
            <div className="new">
                NEW
            </div>
        )
    }
}

const Product: React.FC<{ product: ProductDto }>
    = ({product}) => {
    const {t} = useTranslation();
    const isAuthed = useSelector((store: RootState) => store.auth.isAuth);
    const [isHovered, setIsHovered] = React.useState(false);

    const [isFav, setIsFav] = React.useState(product.isFavorite);

    const handleFavClick = () => {
        // TODO: change styling
        changeFavStatus(product.id, isAuthed)
            .then(() => setIsFav(!isFav))
    };

    // TODO: Change link
    return (
        <Card className="productMainContainer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
            {IsNew(product.isNew)}
            <Button className="favorite" onClick={handleFavClick} disableTouchRipple>{
                isFav
                    ? <FavoriteIcon sx={{width: "30px", height: "30px"}}/>
                    : <FavoriteBorderIcon sx={{width: "30px", height: "30px"}}/>
            }</Button>
            <Link href={`/details/${product.id}`} underline="none">

                <Stack spacing={2} direction='column'
                       sx={{padding: "12px 10px"}}>

                    <CardMedia
                        component="div"
                        sx={{pt: '100%', backgroundSize: 'contain'}}
                        image={product.pieces[0]?.pictures[0]?.urlLg ?? routes.picPlaceholder}
                    />

                    <Stack spacing={'5%'}>
                        <Typography className="productName">
                            {product.name}
                        </Typography>
                        <Typography className="productCategory">
                            {
                                i18n.language === "en"
                                    ? product.category.nameEn
                                    : product.category.nameUa
                            }
                            {product.pieces[0]?.milliliters != 0
                                ? <span> &#8211; </span>
                                : ''}
                            {product.pieces[0]?.milliliters} {t('common.ml')}
                        </Typography>
                        <Stack spacing={2}>
                            <Rating
                                name="hover-feedback"
                                value={product.averageRating}
                                precision={0.5}
                                readOnly
                                icon={<StarIcon style={{color: 'black'}}/>}
                                emptyIcon={
                                    <StarIcon
                                        style={{color: '#9D9D9D'}}
                                        fontSize="inherit"
                                    />}
                            />
                            <Typography className="productPrice">
                                <span style={{textWrap: "nowrap"}}>
                                    {product.pieces[0]?.price} {t('uah')}
                                </span>
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Link>
            {isHovered && (
                <Stack
                    sx={{display: isHovered ? 'block' : 'none'}}
                    className={`hoverBox ${isHovered ? 'show' : ''}`}>
                    <Stack
                        className="hoverProd"
                        spacing={1}
                    >
                        {product.volumes.length != 0 ?
                            <FormControl fullWidth sx={{...textFieldStyle}}>
                                <Select
                                    sx={{
                                        width: '100%',
                                        borderRadius: 0
                                    }}
                                    value={product.id}
                                    // onChange={(e) => changePiece(Number(e.target.value), product)}
                                    displayEmpty>
                                    {product.volumes?.map((volume, index) => (
                                        <MenuItem key={index} /*value={piece.product.pieces[index].id}*/
                                        >
                                            <Typography className="productVolume">
                                                {volume.milliliters} {t('common.ml')}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            : <></>
                        }
                        <Button fullWidth className="butBuy">
                            {t('details.buy')}
                        </Button>
                    </Stack>
                </Stack>
            )}
        </Card>
    );
}

export default Product;
