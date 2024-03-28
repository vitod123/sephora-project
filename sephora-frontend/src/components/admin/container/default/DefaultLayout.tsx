import {Outlet} from "react-router-dom";
import { Container } from "@mui/material";
import HomeHeader from "../../../home/homeHeader/HomeHeader";
import HomeFooter from "../../../home/homeFooter/homeFooter.tsx";

const DefaultLayout = () => {
    return (
        <main>
            <HomeHeader />
            <Container style={{padding: 0, maxWidth:"100%"}}>
                <Outlet/>
            </Container>
            <HomeFooter />
        </main>
    );
}

export default DefaultLayout;
