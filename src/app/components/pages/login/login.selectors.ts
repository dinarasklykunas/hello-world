import { createSelector } from "@ngrx/store";
import { getLoginState } from "src/app/_store";
import { LoginState } from "./login.reducer";

export const getUser = createSelector(getLoginState, (state: LoginState) => state.user);