import { createAction, props } from "@ngrx/store";

export const addItem = createAction(
    '[Cart] Add Item',
    props<{ id: number, count: 1 }>()
);

export const removeItem = createAction(
    '[Cart] Remove Item',
    props<{ id: number }>()
);