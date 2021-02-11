import { createSelector } from "@ngrx/store";
import { Item } from "src/app/models/Item";
import { IAppState } from "../app.state";

export const selectItems = createSelector(
    (state: IAppState) => state.items,
    (items: Array<Item>) => items
);