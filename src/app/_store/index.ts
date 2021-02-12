import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { itemsReducer, ItemsState } from "../components/articles/articles.reducer";

export interface RootState {
    items: ItemsState
};

export const appReducer: ActionReducerMap<RootState> = {
    items: itemsReducer
};

export const getItemsState = createFeatureSelector<ItemsState>('items');