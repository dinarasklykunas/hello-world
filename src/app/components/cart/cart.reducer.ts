import { createReducer, on } from "@ngrx/store";
import { addItem, removeItem } from "./cart.ations";

export interface CartState {
    items: number[]
};

const initialState = {
    items: [ 1, 2, 3 ]
};

export const cartReducer = createReducer(
    initialState,
    on(addItem, (state, props) => ({
        ...state,
        items: [...state.items, props.id]
    })),
    on(removeItem, (state, props) => ({
        ...state,
        items: state.items.filter(id => id !== props.id)
    }))
);