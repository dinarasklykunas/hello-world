import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
// import { itemReducer, ItemState } from "../components/pages/items/item/item.reducer";
import { itemsReducer, ItemsState } from "../components/pages/items/items.reducer";
import { cartReducer, CartState } from "../components/pages/cart/cart.reducer";
import { loginReducer, LoginState } from "../components/pages/login/login.reducer";

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