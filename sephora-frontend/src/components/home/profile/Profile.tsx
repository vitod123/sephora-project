import {Stack, Tab, Tabs} from "@mui/material";
import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import a11yProps from "../../common/tabPanel/a11yProps";
import CustomTabPanel from "../../common/tabPanel/CustomTabPanel";
import tabsStyle from "../../common/tabPanel/tabsStyle";
import Wishlist from "./wishlist/Wishlist";
import ContactInformation from "./contactInformation/ContactInformation";
import AddressBook from "./addressBook/AddressBook";
import OrderHistory from "./orderHistory/OrderHistory";
import './profile.scss'

const Profile = () => {
    const {t} = useTranslation();

    const [value, setValue] = useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Stack className='profile'>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="buyer"
                sx={{
                    "& .MuiTabs-indicator": {
                        display: 'none'
                    },
                    margin: '30px 12%'
                }}
            >
                <Tab label={t('profile.contactInformation')}
                     sx={{...tabsStyle}}
                     {...a11yProps(0)}/>
                <Tab label={t('profile.addressBook')}
                     sx={{...tabsStyle}}
                     {...a11yProps(1)}/>
                <Tab label={t('profile.wishlist')}
                     sx={{...tabsStyle}}
                     {...a11yProps(2)}/>
                <Tab label={t('profile.orderHistory')}
                     sx={{...tabsStyle}}
                     {...a11yProps(3)}/>
            </Tabs>

            <Stack>
                <CustomTabPanel value={value} index={0}>
                    <ContactInformation/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <AddressBook/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <div className={`wishlist-wrapper`}><Wishlist/></div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <OrderHistory/>
                </CustomTabPanel>
            </Stack>
        </Stack>
    );
}

export default Profile;
