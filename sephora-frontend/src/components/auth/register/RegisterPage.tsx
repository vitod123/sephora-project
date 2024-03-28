import * as React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ChangeEvent, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import http_common from "../../../http_common";
import { AuthUserActionType, IRegister, IUser } from "../types";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import "./RegisterPage.scss";
import { useTranslation } from "react-i18next";
import textFieldStyle from "../../../common/textFieldStyle";
import PhoneMask from "../../../common/phoneMask";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { PhotoCamera } from "@mui/icons-material";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState('');

  const initialValues: IRegister = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirmation: "",
    dateOfBirth: new Date(),
    profilePicture: null,
    userName: ""
  };

  
  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("Lastname required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email")
      .test("checkEmail", "Email already registered", async (value) => {
        if (isSubmit) {
          setIsSubmit(false);
          try {
            const result = await http_common.get(
              `Account/checkEmailExists/${value}`
            );
            const { data } = result;
            return !data;
          } catch (error) {
            console.error("Error during email validation:", error);
            return false;
          }
        } else return true;
      }),
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .matches(/[0-9]/, "Password must contain at least 1 number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least 1 special character"
      ),
    passwordConfirmation: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });


  const onHandleSubmit = async (values: IRegister) => {
    try {
      values.userName = values.firstName + values.lastName;

      await registerSchema.validate(values);
      await http_common.post("Account/register", values,
        {headers: {
          "Content-Type": "multipart/form-data",
        }}).then(async () => {
        const result = await http_common.post("Account/login", {
          email: values.email,
          password: values.password,
        });

        const { data } = result;
        const token = data.token;
        localStorage.token = token;
        const user: IUser = jwtDecode(token);
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
        navigate(-1);
      });
    } catch (error) {
      console.error("Error during register: ", error);
    }
  };

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [showPassword2, setShowPassword2] = React.useState<boolean>(false);
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { t } = useTranslation();

  const handleProfilePicChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      if (file) {
        //Перевірка на тип обраного файлу - допустимий тип jpeg, png, gif
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
        ];
        if (!allowedTypes.includes(file.type)) {
          alert("Не допустимий тип файлу");
          return;
        }
        setProfilePic(URL.createObjectURL(file));
      }
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onHandleSubmit}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
      }) => (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h3">
              {t("registration")}
            </Typography>
            <Box sx={{ mt: 5 }}>
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="profile-pic"
                    type="file"
                    onChange={(event) => {handleProfilePicChange(event); setFieldValue("profilePicture", event.target.files?.item(0));}}
                  />
                  <label htmlFor="profile-pic">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  {profilePic && (
                    <Box mt={2} textAlign="center">
                      <Avatar src={profilePic} sx={{ width: 56, height: 56, margin: 'auto' }} />
                    </Box>
                  )}
                </Grid>

                  <FormControl
                    sx={{ ...textFieldStyle, m: 1, width: "670px" }}
                    variant="outlined"
                  >
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      id="firstName"
                      label={t("name")}
                      name="firstName"
                      autoComplete="username"
                      required
                      autoFocus
                      error={touched.firstName && !!errors.firstName}
                      helperText={<ErrorMessage name="firstName" />}
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <FormControl
                    sx={{ ...textFieldStyle, m: 1, width: "670px" }}
                    variant="outlined"
                  >
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      id="lastName"
                      label={t("surname")}
                      name="lastName"
                      autoComplete="lastName"
                      required
                      error={touched.lastName && !!errors.lastName}
                      helperText={<ErrorMessage name="lastName" />}
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <FormControl
                    sx={{ ...textFieldStyle, m: 1, width: "670px" }}
                    variant="outlined"
                  >
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      id="phoneNumber"
                      label={t("phone")}
                      name="phoneNumber"
                      autoComplete="tel"
                      required
                      error={touched.phoneNumber && !!errors.phoneNumber}
                      helperText={<ErrorMessage name="phoneNumber" />}
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputProps={{
                        inputComponent: PhoneMask as any,
                      }}
                    />
                  </FormControl>
                  <FormControl
                    sx={{ ...textFieldStyle, m: 1, width: "670px" }}
                    variant="outlined"
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Field
                        as={DatePicker}
                        margin="normal"
                        fullWidth
                        id="dateOfBirth"
                        label={t("date")}
                        name="dateOfBirth"
                        autoComplete="dateOfBirth"
                        error={touched.dateOfBirth && !!errors.dateOfBirth}
                        helperText={<ErrorMessage name="dateOfBirth" />}
                        onChange={handleChange}
                        value={dayjs(values.dateOfBirth)}
                        onBlur={handleBlur}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl
                    sx={{ ...textFieldStyle, m: 1, width: "670px" }}
                    variant="outlined"
                  >
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      id="email"
                      label={t("email")}
                      name="email"
                      autoComplete="email"
                      required
                      error={touched.email && !!errors.email}
                      helperText={<ErrorMessage name="email" />}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <FormControl
                    sx={{ ...textFieldStyle, m: 1, width: "670px" }}
                    variant="outlined"
                  >
                    <Field
                      as={TextField}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      error={touched.password && !!errors.password}
                      helperText={<ErrorMessage name="password" />}
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
                                <VisibilityOff />
                              ) : (
                                <Visibility />
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
                  <FormControl
                    sx={{ ...textFieldStyle, m: 1, width: "670px" }}
                    variant="outlined"
                  >
                    <Field
                      as={TextField}
                      id="passwordConfirmation"
                      type={showPassword2 ? "text" : "password"}
                      name="passwordConfirmation"
                      required
                      error={
                        touched.passwordConfirmation &&
                        !!errors.passwordConfirmation
                      }
                      helperText={<ErrorMessage name="password" />}
                      value={values.passwordConfirmation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword2}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword2 ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      label={t("registerPassConfirm")}
                      variant="outlined"
                      fullWidth
                    />
                  </FormControl>
                  <Button
                    id="registationButton"
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      setIsSubmit(true);
                    }}
                  >
                    {t("registerBtn")}
                  </Button>
                </Grid>
              </Form>
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
};
export default RegisterPage;

