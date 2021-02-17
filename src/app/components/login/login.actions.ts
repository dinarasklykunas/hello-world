import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/User";

export const loginUser = createAction(
    '[Login] Login User',
    props<{ user: User }>()
);

export const logoutUser = createAction(
    '[Login] Logout User'
);