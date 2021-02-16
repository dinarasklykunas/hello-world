import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/Cart-item';
import { Item } from 'src/app/models/Item';
import { getItemsList } from '../articles/articles.selectors';
import { editItem, removeItem } from '../cart/cart.actions';
import { getCartItemsList } from '../cart/cart.selectors';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() itemReference: CartItem = Input();
  item: Item = null;
  storeItems: Item[] = [];
  cartItems: CartItem[] = [];
  storeItemsSubscription: Subscription = null;
  cartItemsSubscription: Subscription = null;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getStoreItems();
    this.getCartItems();
    this.getItem();
  }

  ngOnDestroy(): void {
    this.storeItemsSubscription.unsubscribe();
    this.cartItemsSubscription.unsubscribe();
  }

  getStoreItems(): void {
    this.storeItemsSubscription = this.store.select(getItemsList)
      .subscribe(items => this.storeItems = items);
  }

  getCartItems(): void {
    this.cartItemsSubscription = this.store.select(getCartItemsList)
      .subscribe(items => this.cartItems = items);
  }

  getItem(): void {
     this.item = this.storeItems.find(item => item.id === this.itemReference.id);
  }

  updateItemCount($event: any): void {
    const count = parseInt($event.target.value);

    if (count < 1)
      return;

    this.store.dispatch(editItem({ id: this.item.id, count }));
    localStorage.setItem('cartItemsList', JSON.stringify(this.cartItems));
  }
  
  removeItemFromCart(): void {
    this.store.dispatch(removeItem({ id: this.item.id }));
    localStorage.setItem('cartItemsList', JSON.stringify(this.cartItems));
  }

}
