import { createReducer, on } from "@ngrx/store";
import { Item } from "src/app/models/Item";
import * as fromCart from "./cart.actions";

export interface CartState {
    items: {
        id: number,
        count: number
    }[]
};

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItemsList')) || []
};

export const cartReducer = createReducer(
    initialState,
    on(fromCart.addItem, (state, props) => ({
        ...state,
        items: [...state.items, props],
    })),
    on(fromCart.removeItem, (state, props) => ({
        ...state,
        items: state.items.filter((item: Item) => item.id !== props.id)
    })),
    on(fromCart.editItem, (state, props) => ({
        ...state,
        items: state.items.map((item: Item) => item.id === props.id ? props : item)
    }))
);