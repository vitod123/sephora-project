import Typography from "@mui/material/Typography";
import "./aboutUs.scss";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <Stack className="aboutUs"
        sx={{
            marginY: 15,
            marginX: "12%"
        }}
        spacing={8}
    >
        <Typography className="title">
          {t('aboutUs.line0')}
        </Typography>
        <Typography className="title">
          {t('aboutUs.line1')}
        </Typography>
        <Stack spacing={5}>
            <Typography className="text">{t("aboutUs.line2")}</Typography>
            <Typography className="text">{t("aboutUs.line3")}</Typography>
            <Typography className="text">{t("aboutUs.line4")}</Typography>
            <Typography className="text">{t("aboutUs.line5")}</Typography>
            <Typography className="text">{t("aboutUs.line6")}</Typography>
        </Stack>
    </Stack>
  );
};

export default AboutUs;
