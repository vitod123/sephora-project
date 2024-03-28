import {Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import './paymentByCard.scss'
import textFieldStyle from '../../../../common/textFieldStyle';


const PaymentByCard = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();


    const [cardNumber, setCardNumber] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCardNumber(value);
    };

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDate(value);
    };

    const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCode(value);
    };


    const handlePayClick = () => {
        if (cardNumber && date && code) {
               navigate('/');
        } 
        else{}
    };    
    
    const [isSaveTheCard, setIsSaveTheCard] = useState<boolean>(false);

    return (
        <Stack className="paymentByCard" marginTop='80px' alignItems='center' spacing={8}>
            <Typography className="title">{t('order.paymentByCard')}</Typography>
            <Stack direction='column' spacing={2} minWidth='400px'>
                <Stack spacing={2}>
                    <TextField
                        sx={{ ...textFieldStyle }} 
                        placeholder={t('order.paymentByCard.cardNumber')}
                        id="payment-cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                    />
                    <Stack direction='row' spacing={2} maxWidth='400px'>
                        <TextField
                            sx={{ ...textFieldStyle }} 
                            placeholder='MM/PP'
                            id="payment-date"
                            value={date}
                            onChange={handleDateChange}
                        />
                        <TextField
                            sx={{ ...textFieldStyle }} 
                            placeholder='CVV'
                            id="payment-cvv"
                            value={code}
                            onChange={handleCodeChange}
                        />
                    </Stack>
                </Stack>
                    
                <FormGroup>
                    <FormControlLabel className="checkCallMe" onClick={() => (setIsSaveTheCard(!isSaveTheCard))} control={<Checkbox size='small'/>} label={t('order.paymentByCard.saveTheCard')} />
                </FormGroup>

                <Button onClick={handlePayClick}>{t('order.paymentByCard.pay')}</Button>
            </Stack>
        </Stack>
    );
}

export default PaymentByCard;
