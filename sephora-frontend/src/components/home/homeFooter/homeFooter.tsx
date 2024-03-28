import Box from "@mui/material/Box";
import "./homeFooter.scss";
import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import routes from "../../../common/routes";

const HomeFooter = () => {
  const boxStyle = {
            display: "flex",
            alignItems: { xs: "flex-start" },
            flexDirection: { xs: "row", sm: "column" },
  }

  const { t } = useTranslation();

  return (
    <>
      <div className="main_footer">
        <Stack 
        /*spacing={12.5}*/ 
          style={{padding:'100px 0'}} justifyContent='space-evenly' direction='row'
        >
          <Box
            sx={{
              ...boxStyle,
            }}
          >
            <Button disableTouchRipple id="links" href={routes.deliveryMain} sx={{paddingBottom:2}}>
             {t('footer.aboutDelivery')}
            </Button>
            {/* <Button>{t('footer.paymentMethods')}</Button>
            <Button>{t('footer.aboutProducts')}</Button> */}
          </Box>
          {/* <Box
            sx={{
              ...boxStyle,
            }}
          >
            <Typography variant="h3" gutterBottom id="links" paddingBottom={2}>
            {t('footer.beautyClub')}
            </Typography>
            <Button>{t('footer.termsOfUse')}</Button>
            <Button>{t('footer.returnsAndExchanges')}</Button>
          </Box> */}
          <Box
            sx={{
              ...boxStyle,
            }}
          >
            <Button href={routes.aboutUs} disableTouchRipple id="links" sx={{paddingBottom: 2}}>
            {t('footer.aboutUs')}
            </Button>
            {/* <Button>{t('footer.addition')}</Button>
            <Button>{t('footer.contacts')}</Button>
            <Button>{t('footer.partnerProgram')}</Button> */}
          </Box>
          {/* <Box
            sx={{
              ...boxStyle,
            }}
          >
            <Typography variant="h3" gutterBottom id="links" paddingBottom={2}>
            {t('footer.articles')}
            </Typography>
            <Button>{t('footer.news')}</Button>
          </Box> */}
          <Box
            sx={{
              ...boxStyle,
            }}
            gap={2}
          >
            <Typography variant="h3" gutterBottom id="links" paddingBottom={2}>
            {t('footer.supportService')}
            </Typography>
            <Typography className="text">(068) 753 32 89</Typography>
            <Typography className="text">(098) 316 67 50</Typography>
            <Typography className="text" style={{textWrap:'wrap', maxWidth:'480px'}}>{t('footer.information')}</Typography>
          </Box>
        </Stack>
      </div>
    </>
  );
};

export default HomeFooter;
