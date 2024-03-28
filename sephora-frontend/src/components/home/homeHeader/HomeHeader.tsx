import IconButton from "@mui/material/IconButton";
import "./homeHeader.scss";
import {Box, Button, OutlinedInput, Stack,} from "@mui/material";
import logo from "../../../assets/images/Group.svg";
import input_main_icon from "../../../assets/images/input_main_icon.svg";
// import icon1 from "../../../assets/images/icon1.svg";
import {useTranslation} from "react-i18next";
import routes from "../../../common/routes.ts";
import LoginPage from "../../auth/login/LoginPage.tsx";
import {Basket} from "../basket/Basket.tsx";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const boxStyleHeader = {
    display: "flex",
    flexDirection: {xs: "column", sm: "row"},
    alignItems: {xs: "center"},
};

const HomeHeader = () => {
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language)
            .catch(console.error);
        localStorage.selectedLanguage = language;
    };

    // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    //   setAnchorElUser(event.currentTarget);
    // };

    const handleSearch = (
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.key !== "Enter"
            || typeof searchTerm === "undefined"
            || searchTerm === null
            || searchTerm.trim().length === 0) return;
        navigate(routes.search + "?q=" + searchTerm);
    }

    const handleSearchClick = () => {
        if (typeof searchTerm === "undefined"
            || searchTerm === null
            || searchTerm.trim().length === 0
        ) return;
        navigate(routes.search + "?q=" + searchTerm);
    }

    return (
        <div className="header">
            <Stack
                spacing={19}
                direction="row"
                sx={{
                    justifyContent: {xs: "center"},
                    marginBottom: 6,
                }}>
                <Button
                    disableTouchRipple
                    sx={{
                        ...boxStyleHeader,
                        gap: 2,
                        "&:hover": {
                            background: "none",
                        },
                    }}
                    href="/">
                    <img src={logo} alt=""/>
                </Button>

                <OutlinedInput
                    className="main_input"
                    id="outlined-adornment-password"
                    type={"text"}
                    placeholder={t("search")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                    sx={{
                        ":before": {borderBottomColor: "white"},
                        ":after": {borderBottomColor: "white"},
                        ":active": {borderBottomColor: "white"},
                    }}
                    endAdornment={
                        <IconButton onClick={handleSearchClick} size="small">
                            <img src={input_main_icon} alt="Search"/>
                        </IconButton>
                    }/>

                <Box sx={{
                    ...boxStyleHeader,
                    gap: 4,
                }}>
                    <Box sx={{
                        ...boxStyleHeader,
                    }}>
                        <Button
                            disableTouchRipple
                            className="lang_link"
                            sx={{color: i18n.language == "en" ? "#000" : "#808080"}}
                            onClick={() => changeLanguage("en")}>
                            ENG
                        </Button>
                        <Button
                            disableTouchRipple
                            className="lang_link"
                            sx={{color: i18n.language == "uk" ? "#000" : "#808080"}}
                            onClick={() => changeLanguage("uk")}>
                            УКР
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            ...boxStyleHeader,
                            gap: 2,
                        }}>
                        {LoginPage()}
                        {/* <Button disableTouchRipple href="/profile">
                            <img src={icon1} alt=""/>
                        </Button> */}
                        {Basket()}
                    </Box>

                </Box>
            </Stack>
            <div className="mainNav">
                <Box sx={{
                    flexGrow: 1,
                    ...boxStyleHeader,
                    justifyContent: {xs: "center"},
                    gap: "6.5%",
                    marginX: "5%",
                }}>
                    <Button href={routes.full_sized} disableTouchRipple>
                        {t("header.fullSizePerfume")}
                    </Button>
                    <Button href={routes.bottled} disableTouchRipple>
                        {t("header.bottled")}
                    </Button>
                    <Button href={routes.care} disableTouchRipple>
                        {t("header.care")}
                    </Button>
                    <Button href={routes.novelties} disableTouchRipple>
                        {t("header.new")}
                    </Button>
                    <Button href={routes.products} disableTouchRipple>
                        {t("header.catalogue")}
                    </Button>
                    <Button href={routes.wishlist} disableTouchRipple>
                        {t("header.wishlist")}
                    </Button>
                    <Button href={routes.aboutUs} disableTouchRipple>
                        {t("header.aboutUs")}
                    </Button>
                    <Button href={routes.deliveryMain} disableTouchRipple>
                        {t("header.paymentAndDelivery")}
                    </Button>
                </Box>
            </div>
        </div>
    );
};

export default HomeHeader;
