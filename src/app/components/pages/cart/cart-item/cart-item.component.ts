import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/Cart-item';
import { Item } from 'src/app/models/Item';
import * as fromArticles from '../../articles/articles.actions';
import { ArticlesService } from '../../articles/articles.service';
import { editItem, removeItem } from '../cart.actions';
import * as fromCart from '../cart.selectors';

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

  constructor(
    private store: Store,
    private itemsService: ArticlesService,
  ) { }

  ngOnInit(): void {
    this.storeItemsSubscription = this.itemsService.getItems().subscribe(items => {
      this.store.dispatch(fromArticles.itemsLoadedSuccess({ items }));
      this.storeItems = items;
      this.cartItemsSubscription = this.store.select(fromCart.getCartItemsList).subscribe(cartItems => {
        this.cartItems = cartItems;
      });
      this.item = this.storeItems.find(item => item.id === this.itemReference.id);
    });
  }

  ngOnDestroy(): void {
    this.storeItemsSubscription.unsubscribe();
    this.cartItemsSubscription.unsubscribe();
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
