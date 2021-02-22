import { createAction, props } from "@ngrx/store";
import { Item } from "src/app/models/Item";

export const loadItems = createAction(
    '[Items] Load Items'
);

export const loadItemsSuccess = createAction(
    '[Items] Items Loaded Success',
    props<{ items: Item[] }>()
);

export const loadItemsError = createAction(
    '[Items] Items Loaded Error'
);

export const loadItem = createAction(
    '[Items] Load Item',
    props<{ id: number }>()
);

export const loadItemSuccess = createAction(
    '[Items] Item Loaded Success',
    props<{ item: Item }>()
);

export const loadItemError = createAction(
    '[Items] Item Loaded Error'
);

export const createItem = createAction(
    '[Items] Create New Item',
    props<{ item: Item }>()
);

export const createItemSuccess = createAction(
    '[Items] Create New Item Success'
);

export const createItemError = createAction(
    '[Items] Create New Item Error'
);

export const deleteItem = createAction(
    '[Edit Item] Delete Item',
    props<{ id: number }>()
);

export const deleteItemSuccess = createAction(
    '[Edit Item] Delete Item Success'
);

export const deleteItemError = createAction(
    '[Edit Item] Delete Item Error'
);

export const editItem = createAction(
    '[Edit Item] Edit Item'
);

export const editItemSuccess = createAction(
    '[Edit Item] Edit Item Success'
);

export const editItemError = createAction(
    '[Edit Item] Edit Item Error'
);