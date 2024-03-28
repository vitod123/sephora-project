import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {persistor, store} from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import "./i18n/i18n.ts";
import {ThemeProvider} from "@mui/material";
import theme from "./common/themeBreakpoints.ts";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {APP_ENV} from "./env";
import { GrabInfo } from "./components/auth/common.ts";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

GrabInfo();

root.render(
    <ThemeProvider theme={theme}>
        <GoogleOAuthProvider clientId={APP_ENV.GOOGLE_CLIENT_ID}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </GoogleOAuthProvider>
    </ThemeProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.info))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
