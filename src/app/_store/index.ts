import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { itemsReducer, ItemsState } from "../components/articles/articles.reducer";
import { cartReducer, CartState } from "../components/cart/cart.reducer";

export interface RootState {
    storeItems: ItemsState,
    cartItems: CartState
};

export const appReducer: ActionReducerMap<RootState> = {
    storeItems: itemsReducer,
    cartItems: cartReducer
};

export const getItemsState = createFeatureSelector<ItemsState>('storeItems');
export const getCartState = createFeatureSelector<CartState>('cartItems');