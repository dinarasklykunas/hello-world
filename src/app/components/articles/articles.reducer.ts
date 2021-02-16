import { createReducer, on } from "@ngrx/store";
import { Item } from "src/app/models/Item";
import * as fromArticles from "./articles.actions";

export interface ItemsState {
    list: Item[]
};

export const initialState = {
    list: []
};

export const itemsReducer = createReducer(
    initialState,
    on(fromArticles.setItems, (state, props) => ({
        ...state,
        list: props.items
    })),
    on(fromArticles.addItem, (state, item) => ({
        ...state,
        list: [...state.list, item]
    })),
    on(fromArticles.removeItem, (state, props) => ({
        ...state,
        list: state.list.filter(item => item.id !== props.id)
    })),
    on(fromArticles.editItem, (state, item) => ({
        ...state,
        list: state.list.map(elem => elem.id === item.id ? item : elem)
    }))
);