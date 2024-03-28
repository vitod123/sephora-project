import { Container, Grid, Stack } from "@mui/material";
import "./banner.scss"
import { IBanner } from "./types";
import React from "react";
// import { useTranslation } from "react-i18next";
import i18n from "i18next";

const Banner: React.FC<{banner:IBanner, color:string, isLeft?:boolean}> 
= ({ banner, color, isLeft=false}) => {

    // const { t } = useTranslation();

  return (
        <Container className="banner" style={{maxWidth:"100%"}} >
             <Grid container spacing={5} direction={isLeft ? "row-reverse" : "row"}>
                <Grid item md={12} lg={6}>
                    <Stack spacing={{md:5, xl:11.25}} className="bannerStack" style={{background:color}}>
                        {
                            i18n.language === "en"
                            ? <Stack spacing={{md:3, xl:5}} maxWidth='600px'>
                                <div className="bannerTitle">{banner.titleEn}</div>
                                <div className="bannerDescription">{banner.descriptionEn}</div>
                            </Stack>
                            : <Stack spacing={{md:3, xl:5}} maxWidth='600px'>
                                <div className="bannerTitle">{banner.titleUa}</div>
                                <div className="bannerDescription">{banner.descriptionUa}</div>
                            </Stack>
                        }
                        {/* <Button className="bannerLink" href={banner.link}>{t('common.button.review')}</Button> */}
                    </Stack>
                </Grid>

                <Grid item md={12} lg={6}>
                    <img style={{ width: "100%", height:"100%" }} src={banner.image} alt=
                    {banner.titleEn}/>
                </Grid>
            </Grid>
          </Container>
    );
}
export default Banner;