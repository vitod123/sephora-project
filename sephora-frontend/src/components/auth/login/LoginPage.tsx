import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {AuthUserActionType, IAuthUser, ILogin, IUser} from "../types";
import http_common from "../../../http_common";
import {jwtDecode} from "jwt-decode";
import "./LoginPage.scss";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
// import FacebookIcon from "@mui/icons-material/Facebook";
import {PasswordRecovery} from "../../common/password_recovery/PasswordRecovery";
import {useTranslation} from "react-i18next";
import {GoogleLogin} from "@react-oauth/google";
import textFieldStyle from "../../../common/textFieldStyle";
import routes from "../../../common/routes";
import icon1 from "../../../assets/images/icon1.svg";
import {RootState} from "../../../store/store.ts";
import {GrabInfo} from "../common.ts";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "52,5%",
    height: "75%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const LoginPage = () => {
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const {t} = useTranslation();
    const [showPassword, setShowPassword] = React.useState(false);
    const {isAuth} = useSelector((store: RootState) => store.auth as IAuthUser);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onLogoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("gtoken");
        dispatch({type: AuthUserActionType.LOGOUT_USER});
        setAnchorElUser(null);
    };

    const initialValues: ILogin = {
        email: "",
        password: "",
    };

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email")
            .test(
                "checkEmail",
                "Email does not exist or is not registered yet",
                async (value) => {
                    if (isSubmit) {
                        setIsSubmit(false);
                        try {
                            const result = await http_common.get(
                                `Account/checkEmailExists/${value}`
                            );
                            const {data} = result;
                            return data;
                        } catch (error) {
                            console.error("Error during email validation:", error);
                            return false;
                        }
                    } else return true;
                }
            ),
        password: Yup.string().required("Password is required"),
    });

    const onHandleSubmit = async (values: ILogin) => {
        try {
            await loginSchema.validate(values);
            const result = await http_common.post("account/login", values);
            const {data} = result;

            const token = data.token;
            localStorage.token = token;
            const user = jwtDecode(token) as IUser;

            dispatch({
                type: AuthUserActionType.LOGIN_USER,
                payload: {
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                    profilePicture: user.profilePicture,
                    registrationDate: user.registrationDate,
                    phoneNumber: user.phoneNumber,
                    roles: user.roles,
                },
            });
            handleClose();
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => event.preventDefault();

    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => {PasswordRecovery(true)};
    // const handleClose = () => setOpen(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onHandleSubmit}
            validationSchema={loginSchema}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
              }) => (
                <div>
                    {!isAuth ? (
                        <Button onClick={handleOpen}>
                            <img src={icon1} alt=""/>
                        </Button>
                    ) : (<>
                            <Button onClick={handleOpenUserMenu}>
                                <img src={icon1} alt=""/>
                            </Button>

                            <Menu
                                sx={{mt: "45px"}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem
                                    key={"Profile"}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Button
                                        href={routes.profile}
                                        className="text"
                                        sx={{justifyContent: 'start'}}
                                    >
                                        {t('profile')}
                                    </Button>
                                </MenuItem>
                                <MenuItem key={"Logout"} onClick={onLogoutHandler} sx={{justifyContent: 'start'}}>
                                    <Typography textAlign="center" className="text">{t('logout')}</Typography>
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Stack
                            sx={style}
                            className="login"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 5,
                                }}
                            >
                                {/*<Button*/}
                                {/*    id="buttonGoogleFacebook"*/}
                                {/*    variant="outlined"*/}
                                {/*    startIcon={*/}
                                {/*        <GoogleIcon sx={{width: "36px", height: "36px"}}/>*/}
                                {/*    }*/}
                                {/*    onClick={() => LoginWithGoogle()}*/}
                                {/*>*/}
                                {/*    Google*/}
                                {/*</Button>*/}
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => {
                                        localStorage.gtoken = credentialResponse.credential;
                                        GrabInfo();
                                        handleClose();
                                    }}
                                    onError={() => console.error("Google One Tap login error")}/>
                                {/* <Button
                                    id="buttonGoogleFacebook"
                                    variant="outlined"
                                    startIcon={
                                        <FacebookIcon sx={{width: "36px", height: "36px"}}/>
                                    }
                                >
                                    Facebook
                                </Button> */}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 7,
                                    mt: 5,
                                }}
                            >
                                <hr color="#514C4C"/>
                                <Typography className="or">{t("or")}</Typography>
                                <hr color="#514C4C"/>
                            </Box>
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={2} sx={{justifyContent: "center", mt: 5,}}>
                                    <FormControl
                                        sx={{...textFieldStyle, width: "670px", mb: 2.5}}
                                        variant="outlined"
                                    >
                                        <Field
                                            as={TextField}
                                            margin="normal"
                                            fullWidth
                                            id="email"
                                            label={t("email/login")}
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            error={touched.email && !!errors.email}
                                            helperText={<ErrorMessage name="email"/>}
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{...textFieldStyle, width: "670px"}}
                                        variant="outlined"
                                    >
                                        <Field
                                            as={TextField}
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            error={touched.password && !!errors.password}
                                            helperText={<ErrorMessage name="password"/>}
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? (
                                                                <VisibilityOff/>
                                                            ) : (
                                                                <Visibility/>
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label={t('password')}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </FormControl>
                                    <Button
                                        disableTouchRipple
                                        className="registationButton"
                                        type="submit"
                                        sx={{mt: 3, mb: 2, alignItems: "center",}}
                                        onClick={() => {
                                            setIsSubmit(true);
                                        }}
                                    >
                                        {t("signIn")}
                                    </Button>
                                </Grid>
                            </Form>
                            <Box>
                                {PasswordRecovery()}
                                <Typography className="regBut">
                                    {t("dontHaveAnAccount")}
                                    <Button
                                        disableTouchRipple
                                        href={routes.register}
                                        className="regBut"
                                        sx={{borderBottom: "1px solid black"}}
                                    >
                                        {" "}
                                        {t("registration")}
                                    </Button>
                                </Typography>
                            </Box>
                        </Stack>
                    </Modal>
                </div>
            )}
        </Formik>
    );
};

export default LoginPage;
