import {configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {thunk} from "redux-thunk";
import {AuthReducer} from "./reducers/AuthReducer";
import {IsLoadingReducer} from "./reducers/IsLoadingReducer";
import {CartReducer} from "./reducers/CartReducer.ts";

const isLoadingPersistConfig = {
    key: "root",
    storage,
};
const cartPersistConfig = {
    key: "cart",
    storage,
};

const loadingPersistedReducer
    = persistReducer(isLoadingPersistConfig, IsLoadingReducer);
const cartPersistedReducer
    = persistReducer(cartPersistConfig, CartReducer);

export const store = configureStore({
    devTools: true,
    reducer: {
        auth: AuthReducer,
        loading: loadingPersistedReducer,
        cart: cartPersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
