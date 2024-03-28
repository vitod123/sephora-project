import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Products from "./products/Products";
import {Banner1, Banner2, Banner3, Reviews1, Reviews2, Reviews3, mainBanner} from "./data";
import Reviews from "./reviews/MainPageReviews";
import Banner from "./mainPage/banner/Banner";
import FullSizeBanner from "./mainPage/banner/FullSizeBanner";
import RecCategories from './mainPage/recCategories/RecCategories';
import MainBanner from './mainPage/banner/MainBanner';
import {useTranslation} from 'react-i18next';
import routes from "../../common/routes.ts";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" to={"/admin"}>
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// // TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

const HomePage = () => {
    const {t} = useTranslation();
    const recCategories = ([
        {name: t('recCategories.showerAndBath'), link: routes.care},
        {name: t('recCategories.accessories'), link: routes.products},
        {name: t('recCategories.vitamins'), link: routes.products},
        {name: t('recCategories.face'), link: routes.care},
    ])

    return (
        <Container style={{padding: '0', maxWidth: '100%'}}>
            <MainBanner banners={mainBanner}/>
            <Stack spacing={19} style={{margin: '0 10%'}}>
                <Products title={t('header.novelty')}
                    link={routes.api.dateOrdered}
                    linkBut={routes.novelties}
                />
                <Products title={t('common.title.popular')}
                    link={routes.api.popularity}
                    linkBut={routes.novelties}
                />
                <Banner banner={Banner1} color="#688F74"/>
                <Products title={t('common.title.perfumes')}
                    link={routes.api.products}
                    linkBut={routes.full_sized}
                />
                <Banner banner={Banner2} color="#820000" isLeft={true}/>
                <RecCategories
                    title={t('common.title.recommendedCategories')}
                    categories={recCategories}
                />
                <FullSizeBanner banner={Banner3}/>
                <Reviews
                    title={t('common.title.reviewsOfOurCustomersAboutCosmeticsAndCare')}
                    reviews={[Reviews1, Reviews2, Reviews3]}
                />
            </Stack>
        </Container>
    );
}
export default HomePage;
