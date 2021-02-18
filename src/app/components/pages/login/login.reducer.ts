import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/User";
import * as fromLogin from "./login.actions";

export interface LoginState {
    user: User
}

export const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null
}

export const loginReducer = createReducer(
    initialState,
    on(fromLogin.loginUser, (state, props) => ({
        ...state,
        user: props
    })),
    on(fromLogin.logoutUser, (state) => ({
        ...state,
        user: null
    }))
);