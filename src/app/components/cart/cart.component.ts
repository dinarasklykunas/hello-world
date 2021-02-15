import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { getItemsList } from '../articles/articles.selectors';
import { removeItem } from './cart.actions';
import { getCartList } from './cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  itemsSubsrition: Subscription;
  cartItemsSubsrition: Subscription;
  cartItems: Item[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getCartItems();
  }
  
  getCartItems(): void {
    this.cartItemsSubsrition = this.store.select(getCartList).subscribe(cartItems => {
      this.itemsSubsrition = this.store.select(getItemsList).subscribe(items => {
        this.cartItems = [];
        cartItems.forEach(cartItem => {
          const item = items.find(elem => elem.id === cartItem.id && elem.quantity > 0);
  
          if (item && !this.cartItems.includes(item)) {
            const newItem = { ...item, count: cartItem.count };
            this.cartItems.push(newItem);
          }
        })
      });
    });
  }

  removeItem(id: number) {
    this.store.dispatch(removeItem({ id }));
  }

  ngOnDestroy(): void {
    this.cartItemsSubsrition.unsubscribe();
    this.itemsSubsrition.unsubscribe();
  }

}
