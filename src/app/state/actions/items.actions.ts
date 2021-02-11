import { createAction, props } from "@ngrx/store";

export const retrievedItemList = createAction(
    '[Item List/API] Retrieve Items Success',
    props<{ Item }>()
);