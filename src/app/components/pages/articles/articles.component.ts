import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { getItemsList } from './articles.selectors';
import * as articlesActions from './articles.actions';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  items$: Observable<Item[]>;
  itemsSubscription: Subscription = null;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(articlesActions.loadItems());
    this.items$ = this.store.select(getItemsList);
  }

}
