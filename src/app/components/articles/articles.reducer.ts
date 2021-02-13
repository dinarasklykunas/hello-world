import { createReducer, on } from "@ngrx/store";
import { Item } from "src/app/models/Item";
import { addItem, editItem, removeItem } from "./articles.actions";

export interface ItemsState {
    list: Item[]
};

export const initialState = {
    list: [
        {
            id: 1,
            title: 'Initial Item 1',
            date: '2021-02-12',
            image: '',
            content: 'Initial Item 1 Content',
        },
        {
            id: 2,
            title: 'Initial Item 2',
            date: '2021-02-12',
            image: '',
            content: 'Initial Item 2 Content',
        },
        {
            id: 3,
            title: 'Initial Item 3',
            date: '2021-02-12',
            image: '',
            content: 'Initial Item 3 Content',
        },
    ]
};

export const itemsReducer = createReducer(
    initialState,
    on(addItem, (state, item) => ({
        ...state,
        list: [...state.list, item]
    })),
    on(removeItem, (state, props) => ({
        ...state,
        list: state.list.filter(item => item.id !== props.id)
    })),
    on(editItem, (state, item) => ({
        ...state,
        list: state.list.map(elem => elem.id === item.id ? item : elem)
    }))
);