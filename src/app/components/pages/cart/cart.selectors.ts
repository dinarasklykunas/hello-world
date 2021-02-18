import { createSelector } from "@ngrx/store";
import { getCartState } from "src/app/_store";
import { CartState } from "./cart.reducer";

export const getCartItemsList = createSelector(getCartState, (state: CartState) => state.items);