import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as itemsActions from "./items.actions";
import { ItemsService } from "./items.service";
import { catchError, concatMap, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from "rxjs";
import { SetValueAction } from "ngrx-forms";
import { editItemFormKey } from "./items.reducer";
import { Store } from "@ngrx/store";
import { getEditItemForm, getSelectedItem } from "./items.selectors";

@Injectable()
export class ArticlesEffects {
    constructor (
        private actions$: Actions,
        private itemsService: ItemsService,
        private store: Store
    ) {}

    loadItems$ = createEffect(() => this.actions$.pipe(
        ofType(itemsActions.loadItems),
        mergeMap(() => this.itemsService.getItems().pipe(
            map(items => itemsActions.loadItemsSuccess({ items })),
            catchError(() => of(itemsActions.loadItemsError))
        ))
    ));

    loadItem$ = createEffect(() => this.actions$.pipe(
        ofType(itemsActions.loadItem),
        mergeMap(action => this.itemsService.getItem(action.id).pipe(
            map(item => itemsActions.loadItemSuccess({ item })),
            catchError(() => of(itemsActions.loadItemError))
        ))
    ));

    loadItemSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(itemsActions.loadItemSuccess),
        switchMap(() => this.store.select(getSelectedItem).pipe(
            map(item => new SetValueAction(editItemFormKey, item))
        ))
    ));

    editItem$ = createEffect(() => this.actions$.pipe(
        ofType(itemsActions.editItem),
        withLatestFrom(this.store.select(getEditItemForm)),
        concatMap(([props, form]) => this.itemsService.editItem(form.value).pipe(
            map(() => itemsActions.editItemSuccess()),
            catchError(() => of(itemsActions.editItemError))
        ))
    ));

    deleteItem$ = createEffect(() => this.actions$.pipe(
        ofType(itemsActions.deleteItem),
        mergeMap(action => this.itemsService.deleteItem(action.id).pipe(
            map(() => itemsActions.deleteItemSuccess()),
            catchError(() => of(itemsActions.deleteItemError))
        ))
    ));
}