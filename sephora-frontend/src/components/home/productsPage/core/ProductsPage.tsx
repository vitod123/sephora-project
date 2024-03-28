import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    CircularProgress,
    Container,
    Grid,
    List,
    ListItemButton,
    Pagination,
    Stack,
    Typography
} from "@mui/material";
import {useTranslation} from "react-i18next";
import Product from "../../products/Product.tsx";
import Filters from "../../filters/Filters.tsx";
import {IFilter} from "../../filters/types.ts";
import React, {useEffect, useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './productsPage.scss'
import http_common from "../../../../http_common.ts";
import PagedList from "../../../../models/pagedlist/PagedList.ts";
import SortingOrder, {Directions, Orders} from "./SortingOrder.ts";
import routes from "../../../../common/routes.ts";
import i18n from "../../../../i18n/i18n.ts";
import "./productsPage.scss";
import ProductDto from "../../../../models/product/ProductDto.ts";

const itemsPerPage = 9;

const ProductsPage: React.FC<{
    title: string,
    link: string,
    mainFilter: IFilter,
    filters: IFilter[],
    defaultOrder: SortingOrder | null | undefined,
    defaultDirection: SortingOrder | null | undefined,
    navigateLink: string | null | undefined
}> = ({
          title,
          mainFilter,
          filters,
          link,
          defaultOrder,
          defaultDirection,
          navigateLink
      }) => {
    const {t} = useTranslation();
    const [products, setProducts] = useState<PagedList<ProductDto>>();

    const [currentPage, setCurrentPage] = useState(1);

    const [order, setOrder] = useState<SortingOrder>(
        defaultOrder ?? Orders[1]
    );
    const handleToggle1 = (value: SortingOrder) => () => {
        setOrder(value);
    };
    const [direction, setDirection] = useState<SortingOrder>(
        defaultDirection ?? Directions[1]
    );
    const handleToggle2 = (value: SortingOrder) => () => {
        setDirection(value);
    };

    useEffect(() => {
        http_common.get(`${link}
        &size=${itemsPerPage}
        &page=${currentPage}
        &sort=${order.value} ${direction.value}`
        )
            .then(r => setProducts(r.data))
            .catch(console.error);
    }, [currentPage, link, order.value, direction.value]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const [expanded, setExpanded] = useState<boolean>(false);

    const handleChange = (panel: boolean) =>
        (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return products
        ? (
            <Container className="productsPage"
                       style={{maxWidth: "100%", justifyContent: "center"}}>
                {navigateLink &&
                    <Stack
                        direction='row'
                        className="navigate"
                        alignItems='center'
                        sx={{padding: "40px 8px"}}>
                        <Button
                            disableTouchRipple
                            href={routes.home}
                            style={{color: "#646464"}}>
                            {t('main')}
                        </Button>
                        /
                        <Button
                            disableTouchRipple
                            href={navigateLink}>
                            {title}
                        </Button>
                    </Stack>
                }
                <Grid container>
                    <Grid item lg={3}>
                        <Stack className='filter' spacing={2.5} sx={{padding: '0 16px'}}>
                            <Typography className='filterName'>
                                {
                                    i18n.language === "en"
                                        ? mainFilter.nameEn
                                        : mainFilter.nameUa
                                }
                            </Typography>
                            {mainFilter.filters.map((filter, i) => (
                                <Button key={i} className='filterText'>
                                    {i18n.language === "en"
                                        ? filter.nameEn
                                        : filter.nameUa}
                                </Button>
                            ))}
                        </Stack>
                        <Filters filters={filters}/>
                    </Grid>
                    <Grid item lg={9}>
                        <Container style={{maxWidth: "100%", justifyContent: "center"}}>
                            <Typography className="title">{title}</Typography>
                            <Container sx={{height: '50px', mt: 5, position: "relative"}}>
                                <Stack sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 25,
                                    zIndex: 1,
                                }}
                                >
                                    <Accordion className='sort' expanded={expanded} onChange={handleChange(true)}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                            <Typography className='sortName'>
                                                {t('sortBy.title')}
                                                <span className="checked">
                                                    {t(order.key)}
                                                </span>
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{p: "0", margin: "0 40px"}}>
                                            <List component="div" role="list">
                                                {Orders.map((value, i) => (
                                                    <ListItemButton
                                                        key={i}
                                                        role="listitem"
                                                        onClick={handleToggle1(value)}
                                                        sx={{p: "0"}}>
                                                        <Typography className={
                                                            order == value
                                                                ? 'checked'
                                                                : 'check'
                                                        }>{t(value.key)}</Typography>
                                                    </ListItemButton>
                                                ))}
                                                {Directions.map((value, i) => (
                                                    <ListItemButton
                                                        key={i}
                                                        role="listitem"
                                                        onClick={handleToggle2(value)}
                                                        sx={{p: "0"}}>
                                                        <Typography className={
                                                            direction == value
                                                                ? 'checked'
                                                                : 'check'
                                                        }>{t(value.key)}</Typography>
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </AccordionDetails>
                                    </Accordion>
                                </Stack>
                            </Container>

                            <Container sx={{pt: 3, pb: 4, m: 0}} style={{maxWidth: "100%"}}>
                                <Grid container spacing={2}>
                                    {products?.items.map((piece, i) => (
                                        <Grid key={i} item xs={12} sm={6} lg={4}>
                                            <Product product={piece}/>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Container>

                            {/*<Button className={`
                            link$
                            {
                                products?.hasNextPage || ' invisible'
                            }
                            `} variant="outlined">*/}
                            {/*    {t('common.button.moreProducts')}*/}
                            {/*</Button>*/}
                            <Stack sx={{margin: '40px', alignItems: 'center'}}>
                                <Pagination
                                    sx={{display: 'flex'}}
                                    count={products?.totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                />
                            </Stack>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        )
        : (
            <Stack sx={{alignItems: 'center', justifyContent: 'center', marginY: 10}}>
                <CircularProgress color="inherit"/>
            </Stack>
        );
}

export default ProductsPage;
