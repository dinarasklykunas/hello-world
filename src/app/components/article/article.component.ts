import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/models/Item';
import { addItem } from '../cart/cart.actions';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() item: Item = Input();

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  addToCart(id: number): void {
    this.store.dispatch(addItem({ id, count: 1 }));
    alert('Product was succesfully added to cart!');
  }

}
