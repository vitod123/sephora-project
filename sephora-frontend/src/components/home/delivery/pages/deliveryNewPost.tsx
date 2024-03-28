import { Button, Stack, Typography } from '@mui/material';
import './deliveryPages.scss';
import { useTranslation } from "react-i18next";
import routes from '../../../../common/routes';


const DeliveryNewPost = () => {

  const { t } = useTranslation();
  
  return (
    <Stack className="deliveryFontStyle"
    sx={{
      marginY: 15,
      marginX: "12%"
    }}
  >
      <Typography className="title" gutterBottom>
        {t('deliveryNewPost_line0')}
      </Typography>
      <Stack className="fontStyleStack" direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <Button disableTouchRipple className="fontStyleStack" href={routes.home}>{t('main')}</Button>/
        <Button disableTouchRipple className="fontStyleStack" href={routes.deliveryMain}>{t('payment_and_delivery')}</Button>/
        <Button disableTouchRipple className="fontStyleStack" href={routes.deliveryNewPost}>{t('deliveryNewPost_line0')}</Button>
      </Stack><br /> <br />
      <Typography className="text">
          {t("deliveryNewPost_line1")}
          <span className='bold'>
          {' ' + t("delivery.theMinimum")}
          </span>
        </Typography><br />
        <Typography className="text">
          {t("deliveryNewPost_line2")}
        </Typography><br />
        <Typography className="text" gutterBottom>
          {t("deliveryNewPost_line3")}
        </Typography> <br /> <br /> <br />
        <Typography className="text" fontWeight={"bold"} gutterBottom>
          {t("deliveryNewPost_line4")}
        </Typography> <br/> <br /> <br />
        <Typography className="text">
          {t("deliveryNewPost_line5")}
        </Typography> <br />
        <Typography className="text">
          {t("deliveryNewPost_line6")}
        </Typography> <br />
        <Typography className="text">
          <span className='bold'>
            {t("delivery.payAttention")}
          </span>
          {t("deliveryNewPost_line7")}
        </Typography> <br />
        <Typography className="text" fontWeight={"bold"}>
          {t("deliveryNewPost_line8")}
        </Typography> <br /> <br /> <br />
        <Typography className="text" fontWeight={"bold"} gutterBottom>
          {t("deliveryNewPost_line9")}
        </Typography> <br /> <br /> <br />
        <Typography className="text">
          <span className='bold'>
            {t("delivery.payAttention")}
          </span>
          {t("deliveryNewPost_line10")}
        </Typography> <br />
        <Typography className="text">
          {t("deliveryNewPost_line11")}
        </Typography>
  </Stack>
  );
}

export default DeliveryNewPost;