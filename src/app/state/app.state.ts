import { Item } from "../models/Item";

export interface IAppState {
    items: ReadonlyArray<Item>
}