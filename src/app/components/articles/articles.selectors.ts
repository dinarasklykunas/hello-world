import { createSelector } from "@ngrx/store";
import { getItemsState } from "src/app/_store";
import { ItemsState } from "./articles.reducer";

export const getItemsList = createSelector(getItemsState, (state: ItemsState) => state.list);