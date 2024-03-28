import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import { orders } from "../../data";
import OrderDto from "../../../../models/order/OrderDto";
import OrderProduct from "../orderProduct/OrderProduct";
import "./orderHistory.scss";
import { Status } from "../../../../common/status";
import { CalculateOrderTotal } from "../../../../common/calculateTotal";


const imgPlaceholder = 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg';
const OrderHistory = () => {
    const {t} = useTranslation();   
    const orders1:OrderDto[] = orders;
    const formattedDate = (order: OrderDto) => {
      return order.date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).replace(/\//g, '.');
    }
     

    return (
        <Stack className="orderHistory" alignItems='center' spacing={5}>
            {orders1.map((order) => (
                <Accordion className="order">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Stack direction='row' justifyContent='space-between' width='100%'>
                            <Stack direction='row'>
                                <Box sx={{background: Status(order.status).color, width: '5px', height: '100%', borderRadius: '7px'}}/>
                                <Stack spacing={2} margin='7.5px 17px'>
                                    <Typography className="text" sx={{fontWeight: '300'}}>
                                        {t('profile.orderHistory.order')}{order.id} {formattedDate(order)}
                                    </Typography>
                                    <Typography className="text">{Status(order.status).name}</Typography>
                                </Stack>
                            </Stack>
                            <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={10}>
                                <Typography className="text">{CalculateOrderTotal(order)} {t('uah')}</Typography>
                                <Stack className="containerScrollX" direction='row-reverse' spacing='15px'>
                                    {order.products.map((product) => (
                                        <Stack width='53px' alignItems='center'>
                                            <img
                                                className="img"
                                                src={product.productPiece.pictures[0].url ?? imgPlaceholder}
                                            />
                                        </Stack>
                                    ))}
                                </Stack>
                            </Stack>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        {order.products.map((product) => (
                            <OrderProduct orderItem={product}/>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
     
        </Stack>
    );
}

export default OrderHistory;
