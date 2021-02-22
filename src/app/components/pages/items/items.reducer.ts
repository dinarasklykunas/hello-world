import { createReducer, on } from "@ngrx/store";
import { createFormGroupState, FormGroupState, onNgrxForms } from "ngrx-forms";
import { Item } from "src/app/models/Item";
import * as itemsActions from "./items.actions";

export const editItemFormKey = 'edit_item_form_key';

export interface EditItemFormModel {
    title: string,
    price: number,
    date: string,
    image: string,
    content: string,
    quantity: number
  };

export interface ItemsState {
    items: Item[],
    selectedItem: Item,
    editItemForm: FormGroupState<EditItemFormModel>
};

export interface ItemState {
    item: Item
};

export const itemsInitialState: ItemsState = {
    items: [],
    selectedItem: {
        title: '',
        price: 0,
        date: '',
        image: '',
        content: '',
        quantity: 0
    },
    editItemForm: createFormGroupState<EditItemFormModel>(editItemFormKey, {
        title: '',
        price: 0,
        date: '',
        image: '',
        content: '',
        quantity: 0
    })
};

export const itemsReducer = createReducer(
    itemsInitialState,
    onNgrxForms(),
    on(itemsActions.loadItemsSuccess, (state, props) => ({
        ...state,
        items: props.items,
        selectedItem: itemsInitialState.selectedItem
    })),
    on(itemsActions.loadItemSuccess, (state, props) => ({
        ...state,
        selectedItem: props.item
    }))
);