import { createSelector } from "@ngrx/store";
import { getItemsState } from "src/app/_store";
import { ItemsState } from "./items.reducer";

export const getItemsList = createSelector(getItemsState, (state: ItemsState) => state.items);
export const getEditItemForm = createSelector(getItemsState, (state: ItemsState) => state.editItemForm);