import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {
    Avatar,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Stack,
    TextField
} from '@mui/material';
import {Edit, Visibility, VisibilityOff} from "@mui/icons-material";
import PhoneMask from "../../../../common/phoneMask";
import {useSelector} from "react-redux";
import {IAuthUser} from "../../../auth/types";
import textFieldStyle from '../../../../common/textFieldStyle';
import {useTranslation} from 'react-i18next';
import {RootState} from "../../../../store/store.ts";


const ContactInformation = () => {
    const {t} = useTranslation();
    const {user} = useSelector((store: RootState) => store.auth as IAuthUser);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPassword2, setShowNewPassword2] = useState(false);
    const [hovered, setHovered] = useState(false);

    const handleAvatarClick = () => {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleSaveClick = (values: any) => {
        // TODO
        console.log(values);
    };

    return (
        <Stack alignItems='center' margin='0 17%' spacing={5}>
            <Formik
                initialValues={{
                    name: user?.userName || '',
                    surname: user?.userName || '',
                    email: user?.email || '',
                    date: user?.registrationDate || new Date(),
                    phone: user?.phoneNumber || '',
                    oldPassword: '',
                    newPassword: '',
                    newPassword2: '',
                    profilePicture: user?.profilePicture
                }}
                onSubmit={(values) => handleSaveClick(values)}
            >
                {({values, handleChange, setFieldValue}) => (
                    <Form style={{width: '100%'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Stack spacing={2}>
                                    <Stack>
                                        <Stack className="text">{t('name')}</Stack>
                                        <Field
                                            as={TextField}
                                            sx={{...textFieldStyle}}
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                        />
                                    </Stack>
                                    <Stack>
                                        <Stack className="text">{t('surname')}</Stack>
                                        <Field
                                            as={TextField}
                                            sx={{...textFieldStyle}}
                                            name="surname"
                                            value={values.surname}
                                            onChange={handleChange}
                                        />
                                    </Stack>
                                    <Stack>
                                        <Stack className="text">{t('email/login')}</Stack>
                                        <Field
                                            as={TextField}
                                            sx={{...textFieldStyle}}
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                    </Stack>
                                    <Stack>
                                        <Stack className="text">{t('date')}</Stack>
                                        <Field
                                            as={TextField}
                                            sx={{...textFieldStyle}}
                                            type="date"
                                            name="date"
                                            value={values.date}
                                            onChange={handleChange}
                                        />
                                    </Stack>
                                    <Stack>
                                        <Stack className="text">{t('phone')}</Stack>
                                        <Field
                                            as={TextField}
                                            sx={{...textFieldStyle}}
                                            name="phone"
                                            value={values.phone}
                                            onChange={handleChange}
                                            InputProps={{
                                                inputComponent: PhoneMask
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Stack spacing={2}>
                                    <Stack>
                                        <Stack className="text">{t('profile.contactInformation.oldPassword')}</Stack>
                                        <Field
                                            as={FormControl}
                                            sx={{...textFieldStyle}}
                                            variant="outlined"
                                            name="oldPassword"
                                            error={false}
                                            value={values.oldPassword}
                                            onChange={handleChange}
                                        >
                                            <OutlinedInput
                                                type={showOldPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowOldPassword((show) => !show)}
                                                            edge="end"
                                                        >
                                                            {showOldPassword ? <VisibilityOff/> : <Visibility/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </Field>
                                        <ErrorMessage name="oldPassword" component={FormHelperText}/>
                                    </Stack>
                                    <Stack>
                                        <Stack className="text">{t('profile.contactInformation.newPassword')}</Stack>
                                        <Field
                                            as={FormControl}
                                            sx={{...textFieldStyle}}
                                            variant="outlined"
                                            name="newPassword"
                                            error={false}
                                            value={values.newPassword}
                                            onChange={handleChange}
                                        >
                                            <OutlinedInput
                                                type={showNewPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowNewPassword((show) => !show)}
                                                            edge="end"
                                                        >
                                                            {showNewPassword ? <VisibilityOff/> : <Visibility/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </Field>
                                        <ErrorMessage name="newPassword2" component={FormHelperText}/>
                                    </Stack>
                                    <Stack>
                                        <Stack
                                            className="text">{t('profile.contactInformation.passwordVerification')}</Stack>
                                        <Field
                                            as={FormControl}
                                            sx={{...textFieldStyle}}
                                            variant="outlined"
                                            name="newPassword2"
                                            error={false}
                                            value={values.newPassword2}
                                            onChange={handleChange}
                                        >
                                            <OutlinedInput
                                                type={showNewPassword2 ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowNewPassword2((show) => !show)}
                                                            edge="end"
                                                        >
                                                            {showNewPassword2 ? <VisibilityOff/> : <Visibility/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </Field>
                                        <ErrorMessage name="newPassword2" component={FormHelperText}/>
                                    </Stack>
                                    <div style={{position: 'relative', cursor: 'pointer'}}
                                         onClick={handleAvatarClick}
                                         onMouseEnter={() => (setHovered(true))}
                                         onMouseLeave={() => (setHovered(false))}
                                    >
                                        <input
                                            type="file"
                                            id="fileInput"
                                            accept="image/*"
                                            style={{display: 'none'}}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                const file = event.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        const result = reader.result as string;
                                                        setFieldValue('profilePicture', result)
                                                            .catch(console.error);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                        <Avatar
                                            alt="User Photo"
                                            src={values.profilePicture}
                                            sx={{width: '180px', height: '180px'}}
                                        />
                                        {hovered &&
                                            <IconButton
                                                style={{
                                                    zIndex: 2,
                                                    position: 'absolute',
                                                    top: '70px',
                                                    left: '70px'
                                                }}
                                                aria-label="edit"
                                            >
                                                <Edit/>
                                            </IconButton>
                                        }
                                    </div>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <Button onClick={handleSaveClick} className="link">{t('profile.save')}</Button>
        </Stack>
    );
}

export default ContactInformation;
