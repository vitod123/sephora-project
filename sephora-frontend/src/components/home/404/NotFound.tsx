import {Button, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import "./notFound.scss";
import notFound from "../../../assets/images/404.png"
import routes from "../../../common/routes";



const NotFound = () => {
    const {t} = useTranslation();

    return (
        <Stack className="notFound" justifyContent="center" margin="10%" alignItems="center">
            <img src={notFound} alt='Not found' className="img"/>
            <Stack alignItems='center' margin='40px'>
                <Typography className="text1">{t('wrong')}</Typography>
                <Typography className="text2">{t('pageIsNotResponding')}</Typography>
            </Stack>
            <Button className="button" sx={{mt:'30px'}} href={routes.home}>{t('return')}</Button>
        </Stack>
    );
}

export default NotFound;
