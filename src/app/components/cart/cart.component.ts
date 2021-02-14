import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { getItemsList } from '../articles/articles.selectors';
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
    this.cartItemsSubsrition = this.store.select(getCartList).subscribe(ids => {
      this.itemsSubsrition = this.store.select(getItemsList).subscribe(items => {
        ids.forEach(id => {
          const item = items.find(elem => elem.id === id);

          if (item && !this.cartItems.includes(item)) {
            this.cartItems.push(item);
          }
        })
      });
    });
  }

  ngOnDestroy(): void {
    this.cartItemsSubsrition.unsubscribe();
    this.itemsSubsrition.unsubscribe();
  }

}
