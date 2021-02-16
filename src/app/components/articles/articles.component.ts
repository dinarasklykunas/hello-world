import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { getItemsList } from './articles.selectors';
import { ArticlesService } from './articles.service';
import * as fromArticles from './articles.actions';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  items$: Observable<Item[]>;
  itemsSubscription: Subscription = null;

  constructor(
    private store: Store,
    private itemsService: ArticlesService
  ) { }

  ngOnInit(): void {
    this.itemsSubscription = this.itemsService.getItems()
      .subscribe(items => this.store.dispatch(fromArticles.setItems({ items })))
    this.items$ = this.store.select(getItemsList);
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

}
