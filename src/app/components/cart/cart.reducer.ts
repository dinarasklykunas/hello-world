import { createReducer, on } from "@ngrx/store";
import { addItem, editItem, removeItem } from "./cart.actions";

export interface CartState {
    items: {
        id: number,
        itemId: number,
        count: number
    }[]
};

const initialState = {
    items: []
};

export const cartReducer = createReducer(
    initialState,
    on(addItem, (state, props) => ({
        ...state,
        items: [...state.items, props]
    })),
    on(removeItem, (state, props) => ({
        ...state,
        items: state.items.filter(item => item.id !== props.id)
    })),
    on(editItem, (state, props) => ({
        ...state,
        items: state.items.map(item => item.id === props.id ? props : item)
    }))
);