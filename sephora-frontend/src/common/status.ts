import { useTranslation } from "react-i18next";
import OrderStatus from "../models/order/OrderStatus";

interface IStatus {
    name: string;
    color: string;
}


export const Status = (status: OrderStatus) => {
    const {t} = useTranslation(); 
    let tmp:IStatus = {name:'', color:''};
    if(status == OrderStatus.CANCELLED_BY_ADMIN 
        || status == OrderStatus.CANCELLED_BY_USER){
        tmp.name = t('profile.orderHistory.cancelled');
        tmp.color = '#FF3D00';
        return tmp;
    }
    else if(status == OrderStatus.DELIVERED 
        || status == OrderStatus.REFUNDED){
        tmp.name = t('profile.orderHistory.delivered');
        tmp.color = '#4CAF50';
        return tmp;
    }
    else{
        tmp.name = t('profile.orderHistory.inProcess');
        tmp.color = '#F3E13A';
        return tmp;
    }
}