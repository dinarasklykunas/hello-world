import { createReducer, on } from "@ngrx/store";
import { Item } from "src/app/models/Item";
import { retrievedItemList } from "../actions/items.actions";

export const initialState: ReadonlyArray<Item> = [
    {
        id: 0,
        title: 'Initial Item 1',
        date: '2021-02-11',
        image: '',
        content: 'Initial Item 1 Content'
    },
    {
        id: 1,
        title: 'Initial Item 2',
        date: '2021-02-11',
        image: '',
        content: 'Initial Item 2 Content'
    }
];

export const itemsReducer = createReducer(
    initialState,
    on(retrievedItemList, (state, { Item }) => Item)
);