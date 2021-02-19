import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as articlesActions from "./articles.actions";
import { ArticlesService } from "./articles.service";
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable()
export class ArticlesEffects {
    constructor (
        private actions$: Actions,
        private articlesService: ArticlesService
    ) {}

    loadItems$ = createEffect(() => this.actions$.pipe(
        ofType(articlesActions.loadItems),
        mergeMap(() => this.articlesService.getItems().pipe(
            map(items => articlesActions.itemsLoadedSuccess({ items })),
            catchError(() => of(articlesActions.ItemsLoadedError))
        ))
    ));

    // itemsLoadedSuccess$ = createEffect(() => this.actions$.pipe(
    //     ofType(articlesActions.itemsLoadedSuccess),
    //     mergeMap(() => this.articlesService.getItems().pipe(
    //         map(items => articlesActions.itemsLoadedSuccess({ items }))
    //     ))
    // ));

    loadItem$ = createEffect(() => this.actions$.pipe(
        ofType(articlesActions.loadItem),
        mergeMap(action => this.articlesService.getItem(action.id).pipe(
            map(item => articlesActions.itemLoadedSuccess(item)),
            catchError(() => of(articlesActions.ItemLoadedError))
        ))
    ));

    editItem$ = createEffect(() => this.actions$.pipe(
        ofType(articlesActions.editItem),
        mergeMap(action => this.articlesService.editItem(action).pipe(
            map(() => articlesActions.editItemSuccess()),
            catchError(() => of(articlesActions.editItemError))
        ))
    ));

    deleteItem$ = createEffect(() => this.actions$.pipe(
        ofType(articlesActions.deleteItem),
        mergeMap(action => this.articlesService.deleteItem(action.id).pipe(
            map(() => articlesActions.deleteItemSuccess()),
            catchError(() => of(articlesActions.deleteItemError))
        ))
    ));
}