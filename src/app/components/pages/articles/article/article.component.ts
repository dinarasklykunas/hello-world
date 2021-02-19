import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/Cart-item';
import { Item } from 'src/app/models/Item';
import { getItemsList } from '../articles.selectors';
import { addItem, editItem } from '../../cart/cart.actions';
import { getCartItemsList } from '../../cart/cart.selectors';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() item: Item = Input();
  itemsSubscription: Subscription;
  cartItemsSubscription: Subscription;
  cartItems: CartItem[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  ngOnDestroy(): void {
    this.cartItemsSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
  }

  getCartItems(): void {
    this.cartItemsSubscription = this.store.select(getCartItemsList).subscribe(cartItems => {
      this.itemsSubscription = this.store.select(getItemsList).subscribe(items => {
        this.cartItems = [];

        cartItems.forEach(cartItem => {
          const item = items.find(elem => elem.id === cartItem.id && elem.quantity > 0);

          if (!item)
            return;
  
          if (!this.cartItems.find(elem => elem.id === item.id)) {
            this.cartItems.push({ id: item.id, count: cartItem.count });
          }
        })
      });
    });
  }

  addToCart(): void {
    if (this.item.quantity < 1) {
      alert('Item cannot be added to your cart');
      return;
    }

    const found = this.cartItems.find(elem => elem.id === this.item.id)

    if (found) {
      this.store.dispatch(editItem({ id: found.id, count: found.count + 1 }));
    } else {
      this.store.dispatch(addItem({ id: this.item.id, count: 1 }));
    }
    
    localStorage.setItem('cartItemsList', JSON.stringify(this.cartItems));
    alert('Product was succesfully added to cart!');
    this.getCartItems();
  }

}
