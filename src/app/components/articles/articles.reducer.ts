import { createReducer, on } from "@ngrx/store";
import { Item } from "src/app/models/Item";
import { addItem, editItem, removeItem } from "./articles.actions";

export interface ItemsState {
    list: Item[]
};

export const initialState = {
    list: [
        {
            title: "Desktop Kit Raspberry Pi 4B 4GB RAM kit with case, keyboard and mouse",
            price: 175.00,
            date: "2021-02-04",
            image: "./assets/img/products/desktop-kit-raspberry-pi-4b-4gb-ram-rinkinys-su-dezute-klaviatura-ir-pele-136196-228x228.jpg",
            content: "",
            quantity: 0,
            id: 1
          },
          {
            title: "Desktop Kit Raspberry Pi 4B 4GB RAM kit with case, keyboard and mouse",
            price: 175.00,
            date: "2021-02-04",
            image: "./assets/img/products/desktop-kit-raspberry-pi-4b-4gb-ram-rinkinys-su-dezute-klaviatura-ir-pele-136196-228x228.jpg",
            content: "",
            quantity: 10,
            id: 2
          },
          {
            title: "Arduino Nano",
            date: "2021-02-05",
            image: "https://images-na.ssl-images-amazon.com/images/I/71%2BvvX%2BVCWL._AC_SX450_.jpg",
            price: 9.99,
            content: "",
            quantity: 10,
            id: 3
          }
    ]
};

export const itemsReducer = createReducer(
    initialState,
    on(addItem, (state, item) => ({
        ...state,
        list: [...state.list, item]
    })),
    on(removeItem, (state, props) => ({
        ...state,
        list: state.list.filter(item => item.id !== props.id)
    })),
    on(editItem, (state, item) => ({
        ...state,
        list: state.list.map(elem => elem.id === item.id ? item : elem)
    }))
);