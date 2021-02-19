import { createAction, props } from "@ngrx/store";
import { Item } from "src/app/models/Item";

export const loadItems = createAction(
    '[Items] Load Items'
);

export const itemsLoadedSuccess = createAction(
    '[Items] Items Loaded Success',
    props<{ items: Item[] }>()
);

export const ItemsLoadedError = createAction(
    '[Items] Items Loaded Error'
);

export const createItem = createAction(
    '[Items] Insert New Item',
    props<Item>()
);

export const createItemSuccess = createAction(
    '[Items] Insert New Item Success'
);

export const createItemError = createAction(
    '[Items] Insert New Item Error'
);

export const deleteItem = createAction(
    '[Edit Item] Remove Item',
    props<{ id: number }>()
);

export const deleteItemSuccess = createAction(
    '[Edit Item] Remove Item Success'
);

export const deleteItemError = createAction(
    '[Edit Item] Remove Item Error'
);

export const editItem = createAction(
    '[Edit Item] Edit Item',
    props<Item>()
);

export const editItemSuccess = createAction(
    '[Edit Item] Edit Item Success'
);

export const editItemError = createAction(
    '[Edit Item] Edit Item Error'
);