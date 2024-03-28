import {Button, Stack, Typography} from "@mui/material";
import "./thank.scss";
import {useTranslation} from "react-i18next";
import { useNavigate } from "react-router-dom";

const Thank = () => {
    const {t} = useTranslation();
    
    const navigate = useNavigate();
    const handleClick = () => {    
        navigate('/detailsOrder');
    };

    return (
        <Stack
            className="thank"
            style={{maxWidth: "90%", height:'80vh', justifyContent:'center', alignItems: "center", margin: 'auto'}}
            spacing={7}
        >
            <Typography className="text">{t('order.thank')}</Typography>
            <Button onClick={handleClick}>{t('order.thank.view')}</Button>
        </Stack>
    );
}

export default Thank;
