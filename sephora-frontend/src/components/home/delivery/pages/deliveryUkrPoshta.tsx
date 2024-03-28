import { Button, Stack, Typography } from '@mui/material';
import './deliveryPages.scss';
import { useTranslation } from "react-i18next";
import routes from '../../../../common/routes';


const DeliveryUkrPoshta = () => {

  const { t } = useTranslation();
  
  return (
    <Stack className="deliveryFontStyle"
    sx={{
      marginY: 15,
      marginX: "12%"
    }}
  >
      <Typography className="title" gutterBottom>
        {t('deliveryUkrPoshta_line0')}
      </Typography>
      <Stack className="fontStyleStack" direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <Button disableTouchRipple className="fontStyleStack" href={routes.home}>{t('main')}</Button>/
        <Button disableTouchRipple className="fontStyleStack" href={routes.deliveryMain}>{t('payment_and_delivery')}</Button>/
        <Button disableTouchRipple className="fontStyleStack" href={routes.deliveryUkrPoshta}>{t('deliveryUkrPoshta_line0')}</Button>
      </Stack><br /> <br />
      <Typography className="text">
        <span className='bold'>
          {t("deliveryUkrPoshta_line1")}
        </span>
        {t("deliveryUkrPoshta_line2")}
        <span className='bold'>
          {t('delivery.theMinimum')}
        </span>
      </Typography><br />
      <Typography className="text">
          {t("deliveryUkrPoshta_line3")}
      </Typography> <br />
      <Typography className="text bold">
        {t("deliveryUkrPoshta_line4")}
      </Typography><br /><br /> <br />
      <Typography className="text">
        <span className='bold'>
          {t('delivery.payAttention')}
        </span>
        {t("deliveryUkrPoshta_line5")}
      </Typography> <br />
      <Typography className="text">
        {t("deliveryUkrPoshta_line6")}
      </Typography> <br />
      <Typography className="text">
        {t("deliveryUkrPoshta_line7")}
      </Typography>
  </Stack>
  );
}

export default DeliveryUkrPoshta;