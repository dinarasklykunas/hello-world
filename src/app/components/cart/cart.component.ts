import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/Cart-item';
import { Item } from 'src/app/models/Item';
import { getItemsList } from '../articles/articles.selectors';
import { removeItem } from './cart.actions';
import { getCartItemsList as getCartItemsList } from './cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.cartItems$ = this.store.select(getCartItemsList);
  }

  removeItem(id: number) {
    this.store.dispatch(removeItem({ id }));
  }

}
