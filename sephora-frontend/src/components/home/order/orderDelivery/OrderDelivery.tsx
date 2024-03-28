import {Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputAdornment, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography} from "@mui/material";
import "./orderDelivery.scss";
import {useTranslation} from "react-i18next";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PaymentByCard from "../paymentByCard/PaymentByCard";
import textFieldStyle from '../../../../common/textFieldStyle';


const OrderDelivery = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();


    const [city, setCity] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [house, setHouse] = useState<string>('');
    const [sq, setSq] = useState<string>('');

    const [cityError, setCityError] = useState<string>('');
    const [streetError, setStreetError] = useState<string>('');
    const [houseError, setHouseError] = useState<string>('');

    const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCity(value);
        setCityError(value ? '' : t('order.delivery.thisFieldIsRequired'));
    };

    const handleStreetChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setStreet(value);
        setStreetError(value ? '' : t('order.delivery.thisFieldIsRequired'));
    };

    const handleHouseChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setHouse(value);
        setHouseError(value ? '' : t('order.delivery.thisFieldIsRequired'));
    };


    const handleToOrderClick = () => {
        setDelivery(delivery ? delivery : 'Pickup')
        setPaymentMethods(paymentMethods ? paymentMethods : 'online')
        if (city && street && house){
            if(paymentMethods == 'online')
                setPaymentIsOnline(true);
            else
                navigate('/thank');
        } else {
            setCityError(city ? '' : t('order.delivery.thisFieldIsRequired'));
            setStreetError(street ? '' : t('order.delivery.thisFieldIsRequired'));
            setHouseError(house ? '' : t('order.delivery.thisFieldIsRequired'));
        }
    };

    const [delivery, setDelivery] = useState('');
    const handleDeliveryChange = (event: SelectChangeEvent) => {
        setDelivery(event.target.value as string);
    };

    const [paymentIsOnline, setPaymentIsOnline] = useState<boolean>(false);
    const [paymentMethods, setPaymentMethods] = useState('');
    const handlePaymentMethodsChange = (event: SelectChangeEvent) => {
        setPaymentMethods(event.target.value as string);
    };

    const [comment, setComment] = useState('');
    const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setComment(value);
    }
    const [isComment, setIsComment] = useState<boolean>(false);
    const handleIsCommentChange = () => {
        if((isComment && comment=='') || (!isComment))
            setIsComment(!isComment);
    }

    const [promoCode, setPromoCode] = useState('');
    const handlePromoCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPromoCode(value);
    }
    const [isPromoCode, setIsPromoCode] = useState<boolean>(false);
    const handleIsPromoCodeChange = () => {
        if((isPromoCode && promoCode=='') || (!isPromoCode))
            setIsPromoCode(!isPromoCode);
    }

    return (
        <>
            {paymentIsOnline ? <PaymentByCard/>
                :
                <Stack className="orderDelivery" margin='80px' alignItems='center' justifyContent='center'>
                    <Stack direction='column' spacing={2} minWidth='400px'>
                        <Stack spacing={2}>
                            <TextField
                                sx={{ ...textFieldStyle }} 
                                placeholder={t('address.city')+'*'}
                                required
                                id="delivery-city"
                                value={city}
                                onChange={handleCityChange}
                                error={!!cityError}
                                helperText={cityError}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormControl fullWidth
                                sx={{ ...textFieldStyle }} 
                            >
                                <Select
                                    id="select-options"
                                    value={delivery}
                                    onChange={handleDeliveryChange}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>
                                        {t('order.delivery.options')}
                                    </MenuItem>
                                    <MenuItem value={'Pickup'}>{t('order.delivery.pickup')}</MenuItem>
                                    <MenuItem value={'Nova Post'}>{t('order.delivery.novaPost')}</MenuItem>
                                    <MenuItem value={'Nova Post(post machine)'}>{t('order.delivery.novaPost.postMachine')}</MenuItem>
                                    <MenuItem value={'Ukrpost'}>{t('order.delivery.ukrpost')}</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                sx={{ ...textFieldStyle }}
                                placeholder={t('address.street')+'*'}
                                required
                                id="delivery-street"
                                value={street}
                                onChange={handleStreetChange}
                                error={!!streetError}
                                helperText={streetError}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Stack direction='row' spacing={2} maxWidth='400px'>
                                <TextField
                                    sx={{ ...textFieldStyle }}
                                    placeholder={t('address.house')+'*'}
                                    required
                                    id="delivery-house"
                                    value={house}
                                    onChange={handleHouseChange}
                                    error={!!houseError}
                                    helperText={houseError}
                                />
                                <TextField
                                    sx={{ ...textFieldStyle }}
                                    placeholder={t('address.sq')}
                                    id="delivery-sq"
                                    value={sq}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSq(event.target.value)}
                                />
                            </Stack>
                            <FormControl fullWidth
                                sx={{ ...textFieldStyle }} 
                            >
                                <Select
                                    id="select-paymentMethods"
                                    value={paymentMethods}
                                    onChange={handlePaymentMethodsChange}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled
                                        sx={{
                                            color:'#9D9D9D'
                                        }}
                                    >
                                        {t('order.delivery.paymentMethods')}
                                    </MenuItem>
                                    <MenuItem value={'cashOnDelivery'}>{t('order.delivery.cashOnDelivery')}</MenuItem>
                                    <MenuItem value={'online'}>{t('order.delivery.online')}</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                        <Stack className='additionally'>
                            <Button onClick={handleIsCommentChange}>
                                <Stack direction='row' spacing={2}>
                                    <Box className="img">
                                        {isComment ? <RemoveIcon/> : <AddIcon/>}
                                    </Box>
                                    <Typography>{t('order.delivery.addComment')}</Typography>
                                </Stack>
                            </Button>
                            {isComment ?
                                <TextField
                                    sx={{ ...textFieldStyle }} 
                                    id="delivery-comment"
                                    value={comment}
                                    onChange={handleCommentChange}
                                    multiline
                                />
                                : <></>
                            }
                            <Button onClick={handleIsPromoCodeChange}>
                                <Stack direction='row' spacing={2}>
                                    <Box className="img">
                                        {isPromoCode ? <RemoveIcon/> : <AddIcon/>}
                                    </Box>
                                    <Typography>{t('order.delivery.promoCode')}</Typography>
                                </Stack>
                            </Button>
                            {isPromoCode ?
                                <TextField
                                    sx={{ ...textFieldStyle }} 
                                    id="delivery-comment"
                                    value={promoCode}
                                    onChange={handlePromoCodeChange}
                                />
                                : <></>
                            }
                            <FormGroup>
                                <FormControlLabel className="checkCallMe" control={<Checkbox size='small'/>} label={t('order.delivery.callMe')} />
                            </FormGroup>
                        </Stack>

                        <Button className="orderBut" onClick={handleToOrderClick}>{t('basket/order.toOrder')}</Button>
                    </Stack>
                </Stack>
            }
        </>
    );
}

export default OrderDelivery;
