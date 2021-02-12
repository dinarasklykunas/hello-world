import { createAction, props } from "@ngrx/store";
import { Item } from "src/app/models/Item";

export const insertNewItem = createAction(
    '[Item] Insert New Item',
    props<Item>()
);