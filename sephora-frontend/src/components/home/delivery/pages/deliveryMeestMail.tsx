import { Button, Stack, Typography } from '@mui/material';
import './deliveryPages.scss';
import { useTranslation } from "react-i18next";
import routes from '../../../../common/routes';

const DeliveryMeestMail = () => {

  const { t } = useTranslation();

  return (
    <Stack className="deliveryFontStyle"
      sx={{
        marginY: 15,
        marginX: "12%"
      }}
    >
        <Typography className="title" gutterBottom>
          {t('deliveryMeestMail_line0')}
        </Typography>
        <Stack className="fontStyleStack" direction={"row"} alignItems={"center"} justifyContent={"center"}>
          <Button disableTouchRipple className="fontStyleStack" href={routes.home}>{t('main')}</Button>/
          <Button disableTouchRipple className="fontStyleStack" href={routes.deliveryMain}>{t('payment_and_delivery')}</Button>/
          <Button disableTouchRipple className="fontStyleStack" href={routes.deliveryMeestMail}>{t('deliveryMeestMail_line0')}</Button>
        </Stack><br /> <br />
        <Typography className="text">
          {t("deliveryMeestMail_line1")}
          <span className="bold">
           {' ' + t("delivery.theMinimum")}
          </span>
        </Typography><br />
        <Typography className="text">
          {t("deliveryMeestMail_line2")}
        </Typography> <br />
        <Typography className="text">
          {t("deliveryMeestMail_line3")}
          <span className='bold'>
            {t("deliveryMeestMail_line4")}
          </span>
        </Typography> <br/> <br /> <br />
        <Typography className="text">
          {t("deliveryMeestMail_line5")}
        </Typography> <br /> <br />
        <Typography className="text">
          {t("deliveryMeestMail_line6")}
        </Typography> <br /><br />
        <Typography className="text" fontWeight={"bold"}>
          {t("deliveryMeestMail_line7")}
        </Typography>
    </Stack>
  );
}

export default DeliveryMeestMail;