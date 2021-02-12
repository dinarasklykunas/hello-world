import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { getItemsList } from './articles.selectors';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  items$: Observable<Item[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.items$ = this.store.select(getItemsList);
  }

}
