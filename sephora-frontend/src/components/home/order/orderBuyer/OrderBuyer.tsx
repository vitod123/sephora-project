import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    Link,
    OutlinedInput,
    Stack,
    Tab,
    Tabs,
    TextField
} from "@mui/material";
import "./orderBuyer.scss";
import {useTranslation} from "react-i18next";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React, {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import textFieldStyle from '../../../../common/textFieldStyle';
import a11yProps from "../../../common/tabPanel/a11yProps";
import CustomTabPanel from "../../../common/tabPanel/CustomTabPanel";
import tabsStyle from "../../../common/tabPanel/tabsStyle";

const OrderBuyer = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [value, setValue] = useState(0);
    const handleChange = (
        _event: React.SyntheticEvent,
        newValue: number
    ) => setValue(newValue);

    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [nameError, setNameError] = useState<string>('');
    const [surnameError, setSurnameError] = useState<string>('');
    const [phoneError, setPhoneError] = useState<string>('');

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setName(value);
        setNameError(value ? '' : 'Це поле обов\'язкове');
    };

    const handleSurnameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSurname(value);
        setSurnameError(value ? '' : 'Це поле обов\'язкове');
    };

    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPhone(value);
        setPhoneError(value ? '' : 'Це поле обов\'язкове');
    };


    const handleFurtherClick = () => {
        if (name && surname && phone) {
            navigate('/');
        } else {
            setNameError(name ? '' : 'Це поле обов\'язкове');
            setSurnameError(surname ? '' : 'Це поле обов\'язкове');
            setPhoneError(phone ? '' : 'Це поле обов\'язкове');
        }
    };

    const handleSingInClick = () => {
        navigate('/');
    }


    return (
        <Stack className="buyer">
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="buyer"
                sx={{
                    "& .MuiTabs-indicator": {
                        display: 'none'
                    },
                    marginBottom: '60px'
                }}
            >
                <Tab label={t('order.newBuyer')}
                     sx={{...tabsStyle}}
                     {...a11yProps(0)}/>
                <Tab label={t('order.regularCustomer')}
                     sx={{...tabsStyle}}
                     {...a11yProps(1)}/>
            </Tabs>

            <CustomTabPanel value={value} index={0}>
                <Stack alignItems='center'>
                    <Stack direction='column' spacing={2} minWidth='400px'>
                        <TextField
                            sx={{...textFieldStyle}}
                            placeholder={t('name') + '*'}
                            required
                            id="newBuyer-name"
                            value={name}
                            onChange={handleNameChange}
                            error={!!nameError}
                            helperText={nameError}
                        />
                        <TextField
                            sx={{...textFieldStyle}}
                            placeholder={t('surname') + '*'}
                            required
                            id="newBuyer-surname"
                            value={surname}
                            onChange={handleSurnameChange}
                            error={!!surnameError}
                            helperText={surnameError}
                        />
                        <TextField
                            sx={{...textFieldStyle}}
                            placeholder={t('phone') + '*'}
                            required
                            id="newBuyer-phone"
                            value={phone}
                            onChange={handlePhoneChange}
                            error={!!phoneError}
                            helperText={phoneError}
                        />
                        <TextField
                            sx={{...textFieldStyle}}
                            placeholder={t('email')}
                            id="newBuyer-email"
                            value={email}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                        />

                        <Button onClick={handleFurtherClick} className="button">{t('order.further')}</Button>

                        <Stack alignItems='center'>
                            <Link href='/' className="link">{t('order.continueShopping')}</Link>
                        </Stack>
                    </Stack>
                </Stack>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <Stack alignItems='center'>
                    <Stack direction='column' spacing={2} minWidth='400px'>
                        <FormControl
                            sx={{...textFieldStyle}}
                            variant="outlined">
                            <OutlinedInput
                                value={email}
                                placeholder={t('email')}
                                id="order-email"
                                type={'text'}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                            />
                        </FormControl>
                        <FormControl
                            sx={{...textFieldStyle}}
                            variant="outlined"
                        >
                            <OutlinedInput
                                placeholder={t('password')}
                                id="order-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Stack alignItems='end'>
                            <Link href='#' className="link">{t('forgotPassword')}</Link>
                        </Stack>
                        <Button onClick={handleSingInClick} className="button">{t('signIn')}</Button>

                        <Stack alignItems='center'>
                            <Link href='/' className="link">{t('order.continueShopping')}</Link>
                        </Stack>
                    </Stack>
                </Stack>
            </CustomTabPanel>
        </Stack>
    );
}

export default OrderBuyer;
