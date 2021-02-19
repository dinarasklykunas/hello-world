import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { itemReducer, ItemState } from "../components/pages/articles/article/article.reducer";
import { itemsReducer, ItemsState } from "../components/pages/articles/articles.reducer";
import { cartReducer, CartState } from "../components/pages/cart/cart.reducer";
import { loginReducer, LoginState } from "../components/pages/login/login.reducer";

export interface RootState {
    storeItems: ItemsState,
    cartItems: CartState,
    user: LoginState,
    selectedItem: ItemState
};

export const appReducer: ActionReducerMap<RootState> = {
    storeItems: itemsReducer,
    cartItems: cartReducer,
    user: loginReducer,
    selectedItem: itemReducer
};

export const getItemsState = createFeatureSelector<ItemsState>('storeItems');
export const getCartState = createFeatureSelector<CartState>('cartItems');
export const getLoginState = createFeatureSelector<LoginState>('user');
export const getSelectedItemState = createFeatureSelector<ItemState>('selectedItem');