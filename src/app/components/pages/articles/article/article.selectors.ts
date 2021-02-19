import { createSelector } from "@ngrx/store";
import { getSelectedItemState } from "src/app/_store";
import { ItemState } from "./article.reducer";

export const getSelectedItem = createSelector(getSelectedItemState, (state: ItemState) => state.item)