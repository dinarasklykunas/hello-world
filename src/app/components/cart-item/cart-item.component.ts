import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from 'src/app/models/Cart-item';
import { Item } from 'src/app/models/Item';
import { getItemsList } from '../articles/articles.selectors';
import { editItem, removeItem } from '../cart/cart.actions';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() itemReference: CartItem = Input();
  item: Item = null;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.item = this.getItem();
  }

  getItem(): Item {
    let found = null;

    this.store.select(getItemsList).subscribe(items => {
      found = items.find(item => item.id === this.itemReference.id);
    }).unsubscribe();

    return found;
  }

  updateItemCount($event: any) {
    const count = parseInt($event.target.value);

    if (count < 1)
      return;

    this.store.dispatch(editItem({ id: this.item.id, count }));
  }

  removeItemFromCart() {
    this.store.dispatch(removeItem({ id: this.item.id }));
  }

}
