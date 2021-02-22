import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as itemsActions from "./items.actions";
import { ItemsService } from "./items.service";
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { ResetAction, SetValueAction } from "ngrx-forms";
import { editItemFormKey } from "./items.reducer";
import { itemsInitialState } from './items.reducer';

@Injectable()
export class ArticlesEffects {
    constructor (
        private actions$: Actions,
        private articlesService: ItemsService
    ) {}

    loadItems$ = createEffect(() => this.actions$.pipe(
        ofType(itemsActions.loadItems),
        mergeMap(() => this.articlesService.getItems().pipe(
            map(items => itemsActions.loadItemsSuccess({ items })),
            catchError(() => of(itemsActions.loadItemsError))
        ))
    ));

    itemsLoadedSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(itemsActions.loadItemsSuccess),
        switchMap(() => of(
            new SetValueAction(editItemFormKey, itemsInitialState.editItemForm.value),
            new ResetAction(editItemFormKey)
        ))
    ));

    loadItem$ = createEffect(() => this.actions$.pipe(
        ofType(itemsActions.loadItem),
        mergeMap(action => this.articlesService.getItem(action.id).pipe(
            map(item => itemsActions.loadItemSuccess(item)),
            catchError(() => of(itemsActions.loadItemError))
        ))
    ));

    editItem$ = createEffect(() => this.actions$.pipe(
        ofType(itemsActions.editItem),
        mergeMap(action => this.articlesService.editItem(action).pipe(
            map(() => itemsActions.editItemSuccess()),
            catchError(() => of(itemsActions.editItemError))
        ))
    ));

    deleteItem$ = createEffect(() => this.actions$.pipe(
        ofType(itemsActions.deleteItem),
        mergeMap(action => this.articlesService.deleteItem(action.id).pipe(
            map(() => itemsActions.deleteItemSuccess()),
            catchError(() => of(itemsActions.deleteItemError))
        ))
    ));

    deleteItemSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(itemsActions.deleteItemSuccess),
        switchMap(() => of(
            new SetValueAction(editItemFormKey, itemsInitialState.editItemForm.value),
            new ResetAction(editItemFormKey)
        ))
    ));
}