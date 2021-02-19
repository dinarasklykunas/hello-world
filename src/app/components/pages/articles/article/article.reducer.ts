import { createReducer, on } from "@ngrx/store";
import { Item } from "src/app/models/Item";
import * as articlesActions from "../articles.actions";

export interface ItemState {
    item: Item
};

export const initialState = {
    item: null
};

export const itemReducer = createReducer(
    initialState,
    on(articlesActions.itemLoadedSuccess, (state, props) => ({
        ...state,
        item: props
    }))
);