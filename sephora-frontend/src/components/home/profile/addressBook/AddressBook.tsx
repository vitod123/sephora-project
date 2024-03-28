import {Box, Button, Grid, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import textFieldStyle from '../../../../common/textFieldStyle';
import PhoneMask from "../../../../common/phoneMask";
import SearchIcon from '@mui/icons-material/Search';
import { addresses } from "../../data";
import "./addressBook.scss";



const AddressBook = () => {
    const {t} = useTranslation();    
    const navigate = useNavigate();

    const Addresses = addresses;

    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [house, setHouse] = useState<string>('');
    const [sq, setSq] = useState<string>('');

    
    const handleSaveClick = () => {
        navigate('/');
    };

    return (
        <Stack className="addressBook" justifyContent="center" margin="0 10%">
            <Grid container>
                <Grid item sm={12} md={6}>
                    <Stack alignItems='center' spacing={4}>
                        <Typography className="addAddress">{t('profile.addressBook.addAddress')}</Typography>
                        <Stack spacing={2} minWidth='400px'>
                            <TextField
                                sx={{ ...textFieldStyle }} 
                                placeholder={t('name')}
                                value={name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                            />
                            <TextField
                                sx={{ ...textFieldStyle }} 
                                placeholder={t('surname')}
                                value={surname}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSurname(event.target.value)}
                            />
                            <TextField
                                sx={{ ...textFieldStyle }} 
                                placeholder={t('phone')}
                                value={phone}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPhone(event.target.value)}
                                InputProps={{
                                    inputComponent: PhoneMask as any
                                }}
                            />
                            <TextField
                                sx={{ ...textFieldStyle }} 
                                placeholder={t('address.city')}
                                value={city}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCity(event.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                sx={{ ...textFieldStyle }} 
                                placeholder={t('address.street')}
                                value={street}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStreet(event.target.value)}
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
                                    placeholder={t('address.house')}
                                    value={house}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHouse(event.target.value)}
                                />
                                <TextField
                                    sx={{ ...textFieldStyle }} 
                                    placeholder={t('address.sq')}
                                    value={sq}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSq(event.target.value)}
                                /> 
                            </Stack>
                            
                        </Stack>
                        <Button className="link" onClick={handleSaveClick} sx={{width:'400px'}}>{t('profile.save')}</Button>
                    </Stack>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Stack spacing={2} maxWidth='520px' marginTop={5} className="containerScroll">
                        {Addresses.map((address) => (
                            <Stack className="address" spacing={2}>
                                <Typography className="name">{address.surname} {address.name}</Typography>
                                <Stack spacing={1}>
                                    <Typography className="text">{t('profile.addressBook.st')}{address.street}, {address.house}</Typography>
                                    <Typography className="text">{address.city}</Typography>
                                    <Typography className="text">{t('profile.addressBook.tel')} {address.phone}</Typography>
                                </Stack>
                                <Box className='line'/>
                                <Stack alignItems='flex-start'>
                                    <Button className="edit">{t('profile.addressBook.edit')}</Button>
                                </Stack>
                            </Stack>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default AddressBook;
