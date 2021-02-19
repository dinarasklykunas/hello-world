import { createReducer, on } from "@ngrx/store";
import { Item } from "src/app/models/Item";
import * as articlesActions from "./articles.actions";

export interface ItemsState {
    list: Item[]
};

export const initialState = {
    list: []
};

export const itemsReducer = createReducer(
    initialState,
    on(articlesActions.itemsLoadedSuccess, (state, props) => ({
        ...state,
        list: props.items
    }))
);