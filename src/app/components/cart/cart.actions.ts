import { createAction, props } from "@ngrx/store";

export const addItem = createAction(
    '[Cart] Add Item',
    props<{ id: number, count: number }>()
);

export const removeItem = createAction(
    '[Cart] Remove Item',
    props<{ id: number }>()
);

export const editItem = createAction(
    '[Cart] Edit Item',
    props<{ id: number, count: number }>()
);