import { createAction, props } from "@ngrx/store";
import { Item } from "src/app/models/Item";

export const addItem = createAction(
    '[Item] Insert New Item',
    props<Item>()
);

export const removeItem = createAction(
    '[Item] Remove Item',
    props<{ id: number }>()
);

export const editItem = createAction(
    '[Item] Edit Item',
    props<Item>()
);