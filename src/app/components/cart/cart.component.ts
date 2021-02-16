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
  cartItems: CartItem[];
  cartItemsSubsription: Subscription = null;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.cartItemsSubsription = this.store.select(getCartItemsList)
      .subscribe(items => this.cartItems = items);
  }

  onOnDestroy(): void {
    this.cartItemsSubsription.unsubscribe();
  }

}
