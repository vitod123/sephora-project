import {store} from "../../store/store.ts";
import {AuthUserActionType, IGoogleUser, IUser} from "./types.ts";
import {jwtDecode} from "jwt-decode";
import http_common from "../../http_common.ts";

// check if anything is in the local storage (cart, wishlist, etc.)
// and if so, send it to the server
async function PostLocalStorage() {
    if (localStorage.cart) {
        const cart = JSON.parse(localStorage.cart);
        for (const item of cart.items) {
            try {
                await http_common.post("/cart", item);
            } catch (e) {
                console.error(e);
            }
        }
        localStorage.removeItem("cart");
    }

    if (localStorage.favorites) {
        const favorites = JSON.parse(localStorage.favorites);
        for (const id of favorites) {
            try {
                await http_common.put(`/favorites/${id}`);
            } catch (e) {
                console.error(e);
            }
        }
        localStorage.removeItem("favorites");
    }
}

async function GrabInfo() {
    const gToken = localStorage.gtoken,
        token = localStorage.token;

    if (!gToken && !token) return;

    if (gToken) {
        const user = jwtDecode(gToken) as IGoogleUser;
        if (!user || user.exp * 1000 < Date.now()) {
            localStorage.removeItem('gtoken');
            return;
        }

        if (!token) {
            try {
                const response = await http_common.post('account/auth/google', gToken);
                localStorage.token = response.data.token;
                await PostLocalStorage();
            } catch (e) {
                console.error(e);
            }
        }

        store.dispatch({
            type: AuthUserActionType.LOGIN_GOOGLE_USER,
            payload: {
                id: user?.sub,
                userName: user?.name,
                email: user?.email,
                profilePicture: user?.picture,
                roles: ['User'],
            },
        });
    } else if (token) {
        const user = jwtDecode(token) as IUser;
        store.dispatch({
            type: AuthUserActionType.LOGIN_USER,
            payload: {
                id: user.id,
                userName: user.userName,
                email: user.email,
                profilePicture: user.profilePicture,
                registrationDate: user.registrationDate,
                phoneNumber: user.phoneNumber,
                roles: user.roles,
            },
        });

        await PostLocalStorage();
    }
}

export {GrabInfo};
