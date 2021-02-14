import { createReducer, on } from "@ngrx/store";
import { addItem, removeItem } from "./cart.actions";

export interface CartState {
    items: {id: number, count: number}[]
};

const initialState = {
    items: []
};

export const cartReducer = createReducer(
    initialState,
    on(addItem, (state, props) => ({
        ...state,
        items: [...state.items, { id: props.id, count: 1 }]
    })),
    on(removeItem, (state, props) => ({
        ...state,
        items: state.items.filter(item => item.id !== props.id)
    }))
);