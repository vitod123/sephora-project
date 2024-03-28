import {
  Button,
  Container,
  Grid,
  IconButton,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import input_main_icon from "../../../../assets/images/input_main_icon.svg";
import deliveryFreeByCourier from "../../../../assets/images/delivery/deliveryFreeByCourier.svg";
import deliveryPickup from "../../../../assets/images/delivery/deliveryPickup.svg";
import deliveryNewPost from "../../../../assets/images/delivery/deliveryNewPost.svg";
import deliveryUkrPoshta from "../../../../assets/images/delivery/deliveryUkrPoshta.svg";
import deliveryMeestMail from "../../../../assets/images/delivery/deliveryMeestMail.svg";
import deliveryByCourierInUkraine from "../../../../assets/images/delivery/deliveryByCourierInUkraine.svg";
import './deliveryMain.scss';
import { useTranslation } from "react-i18next";
import routes from "../../../../common/routes";

const DeliveryMain = () => {
  const { t } = useTranslation();
const deliveries = [
  {
    image: deliveryFreeByCourier,
    title: t('deliveryOptions.freeByCourier'),
    description: t('deliveryOptions.freeByCourier.details'),
    link: routes.deliveryFreeLuxuryHub
  },
  {
    image: deliveryPickup,
    title: t('deliveryOptions.pickup'),
    description: t('deliveryOptions.pickup.details'),
    link: routes.deliveryPickup
  },
  {
    image: deliveryNewPost,
    title: t('deliveryOptions.newPost'),
    description: t('deliveryOptions.newPost.details'),
    link: routes.deliveryNewPost
  },
  {
    image: deliveryUkrPoshta,
    title: t('deliveryOptions.ukrposhta'),
    description: t('deliveryOptions.ukrposhta.details'),
    link: routes.deliveryUkrPoshta
  },
  {
    image: deliveryMeestMail,
    title: t('deliveryOptions.meest'),
    description: t('deliveryOptions.meest.details'),
    link: routes.deliveryMeestMail
  },
  {
    image: deliveryByCourierInUkraine,
    title: t('deliveryOptions.byCourier'),
    description: t('deliveryOptions.byCourier.details'),
    link: routes.deliveryByCourierInUkraine
  }
]
  return (
    <>
      <Container
        className="mainPageDelivery"
        style={{maxWidth: "80%", justifyContent: "center", margin: '140px auto'}}
      >
       
       <Stack
          alignItems="center"
          justifyContent='center'
          spacing={15}
        >
          <Stack
            sx={{background:'#FAFAFA', width: '55%', padding: '50px 30px'}}
            alignItems="center"
            justifyContent='center'
            spacing={7.5}
          >
            <Stack spacing={3} alignItems="center"
            justifyContent='center'>
              <Typography className="title">{t('delivery.weMakeYouHappy')}</Typography>
              <Typography className="titleDesc">{t('delivery.enterTheName')}</Typography>
            </Stack>
            <Input
              id="standard-adornment-password"
              type='text'
              sx={{ width: '75%' }}
              classes={{ underline: 'custom-input-underline' }}
              className='titleDesc'
              endAdornment={
                <IconButton size="small" aria-label="toggle password visibility">
                  <img src={input_main_icon} alt=""/>
                </IconButton>
              }
              placeholder={t('delivery.search')}
            />
          </Stack>

          <Stack spacing={10} alignItems='center'>
            <Typography className="title">{t('deliveryOptions')}</Typography>
            <Grid container spacing={2}>
              {deliveries.map((delivery) => (
                <Grid item xs={12} md={6} lg={4}>
                  <Button href={delivery.link} disableTouchRipple style={{textDecoration:'none', width:"100%"}}>
                    <Stack alignItems="center" className="delivery" justifyContent='center' spacing={4} sx={{width:"100%"}}>
                      <Stack sx={{height: '94px', justifyContent: 'center'}}>
                        <img src={delivery.image} alt={delivery.title} />
                      </Stack>
                      <Stack alignItems="center" justifyContent='center' spacing={1}>
                      <Typography className="deliveriesTitle">
                        {delivery.title}
                      </Typography>
                      <Typography className="deliveriesText">
                        {delivery.description}
                      </Typography>
                      </Stack>
                    </Stack>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
export default DeliveryMain;