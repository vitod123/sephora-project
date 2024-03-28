import Typography from "@mui/material/Typography";
import "./deliveryPages.scss";
import { useTranslation } from "react-i18next";
import { Button, Stack } from "@mui/material";
import routes from "../../../../common/routes";

const DeliveryFreeLuxuryHub = () => {
  const { t } = useTranslation();

  return (
    <Stack className="deliveryFontStyle"
      sx={{
        marginY: 15,
        marginX: "12%"
      }}
    >
        <Typography className="title" gutterBottom>
          {t('deliveryFreeLuxuryHub_line0')}
        </Typography>
        <Stack className="fontStyleStack" direction={"row"} alignItems={"center"} justifyContent={"center"}>
          <Button disableTouchRipple className="fontStyleStack" href={routes.home}>{t('main')}</Button>/
          <Button disableTouchRipple className="fontStyleStack" href={routes.deliveryMain}>{t('payment_and_delivery')}</Button>/
          <Button disableTouchRipple className="fontStyleStack" href={routes.deliveryFreeLuxuryHub}>{t('deliveryFreeLuxuryHub_line0')}</Button>
        </Stack><br /> <br />
        <Typography className="text">
          {t("deliveryFreeLuxuryHub_line1")}
        </Typography><br />
        <Typography className="text">
          {t("deliveryFreeLuxuryHub_line2")}
        </Typography><br />
        <Typography className="text" gutterBottom>
          {t("deliveryFreeLuxuryHub_line3")}
        </Typography><br /><br />
        <Typography className="text">
          {t("deliveryFreeLuxuryHub_line4")}
        </Typography> <br />
        <Typography className="text">
          {t("deliveryFreeLuxuryHub_line5")}
        </Typography> <br/>
        <Typography className="text">
          {t("deliveryFreeLuxuryHub_line6")}
        </Typography> <br />
        <Typography className="text">
          {t("deliveryFreeLuxuryHub_line7")}
        </Typography> <br />
        <Typography className="text" gutterBottom>
          {t("deliveryFreeLuxuryHub_line8")}
        </Typography> <br /> <br />
        <Typography className="text">
          {t("deliveryFreeLuxuryHub_line9")}
        </Typography> <br />
        <Typography className="text">
          {t("deliveryFreeLuxuryHub_line10")}
        </Typography> <br />
        <Typography className="text">
          {t("deliveryFreeLuxuryHub_line11")}
        </Typography> <br />
        <Typography className="text">
          {t("deliveryFreeLuxuryHub_line12")}
        </Typography> <br />
        <Typography className="text">
          {t("deliveryFreeLuxuryHub_line13")}
        </Typography> <br /><br />
        <Typography className="text">
          {t("deliveryFreeLuxuryHub_line14")}
        </Typography>
    </Stack>
  );
};

export default DeliveryFreeLuxuryHub;
