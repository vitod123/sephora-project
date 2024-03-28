import axios from "axios";
import {APP_ENV} from "./env";

const auth = localStorage.token
    ? `Bearer ${localStorage.token}`
    : undefined;
const http_common = axios.create({
    baseURL: APP_ENV.BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: auth,
    },
});

// http_common.interceptors.request.use(
//     (config) => {
//         const action: IsLoadingTypes = {
//             payload: true,
//             type: IsLoadingActionTypes.SET_LOADING,
//         };
//         store.dispatch(action);
//         return config;
//     },
//     () => {
//         const action: IsLoadingTypes = {
//             payload: false,
//             type: IsLoadingActionTypes.SET_LOADING,
//         };
//         store.dispatch(action);
//     }
// );
//
// http_common.interceptors.response.use(
//     (config) => {
//         const action: IsLoadingTypes = {
//             payload: false,
//             type: IsLoadingActionTypes.SET_LOADING,
//         };
//         store.dispatch(action);
//
//         // shown - 🤓
//         //   const notificationAction: NotificationSetShowed = {
//         //     payload: true,
//         //     type: NotificationActionTypes.SET_SHOWED,
//         //   };
//         //   store.dispatch(notificationAction);
//         return config;
//     },
//     () => {
//         const action: IsLoadingTypes = {
//             payload: false,
//             type: IsLoadingActionTypes.SET_LOADING,
//         };
//         store.dispatch(action);
//     }
// );

export default http_common;
