import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { itemsReducer, ItemsState } from "../components/articles/articles.reducer";
import { cartReducer, CartState } from "../components/cart/cart.reducer";
import { loginReducer, LoginState } from "../components/login/login.reducer";

export interface RootState {
    storeItems: ItemsState,
    cartItems: CartState,
    user: LoginState
};

export const appReducer: ActionReducerMap<RootState> = {
    storeItems: itemsReducer,
    cartItems: cartReducer,
    user: loginReducer
};

export const getItemsState = createFeatureSelector<ItemsState>('storeItems');
export const getCartState = createFeatureSelector<CartState>('cartItems');
export const getLoginState = createFeatureSelector<LoginState>('user');