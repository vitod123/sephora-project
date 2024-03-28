import { Box, /*Button,*/ Container, Grid, Stack, Typography } from "@mui/material";
import "./banner.scss";
// import { useTranslation } from "react-i18next";
import React from "react";
import { IMainBanner } from "./types";
import i18n from "i18next";

const MainBanner: React.FC<{ banners: IMainBanner[] }>
= ({banners}) => {
    // const { t } = useTranslation();

  return (
        <Container className="mainBanner" style={{maxWidth:"100%"}} >
            <Grid container>

            <Grid item lg={6} style={{position:"relative"}}>
                <img style={{ width: "100%", height:"90%" }} className="imgLeft"  src={banners[0].image}/>
                <Box className="bannerBox1">
                    {
                        i18n.language === "en"
                        ? <Typography className='bannerTitle1'>{banners[0].titleEn}</Typography>
                        : <Typography className='bannerTitle1'>{banners[0].titleUa}</Typography>
                    }
                {/* <Button className='butMainBanner' href={banners[0].link}>{t('common.button.moreDetails')}</Button> */}
                </Box>
            </Grid>

            <Grid item lg={6} style={{position:"relative"}}>
                <img style={{ width: "100%", height:"90%" }}  src={banners[1].image}/>
                {
                    i18n.language === "en"
                    ? <Stack>
                        <Typography className='bannerTitle2'>{banners[1].titleEn}</Typography>
                        <Typography className='bannerDes'>{banners[1].descriptionEn}</Typography>
                    </Stack>
                    : <Stack>
                        <Typography className='bannerTitle2'>{banners[1].titleUa}</Typography>
                        <Typography className='bannerDes'>{banners[1].descriptionUa}</Typography>
                    </Stack>
                }
            </Grid>

            </Grid>
        </Container>
    );
}

export default MainBanner