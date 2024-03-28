import { Button, Container } from "@mui/material";
import "./banner.scss"
import { IFullSizeBanner } from "./types";
import React from "react";
import { useTranslation } from "react-i18next";

const FullSizeBanner : React.FC<{banner: IFullSizeBanner}> 
= ({ banner }) => {

  const { t } = useTranslation();

  return (
        <Container className="fullSizeBanner" style={{maxWidth:"100%", 
        position:"relative"}} >
           <img style={{width:'100%'}} src={banner.image}/>
           <Button className='butBanner' href={banner.link}>{t('common.button.review')}</Button>
        </Container>
    );
};

export default FullSizeBanner;