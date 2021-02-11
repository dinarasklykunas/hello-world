import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ItemService } from 'src/app/services/item.service';
import { retrievedItemList } from 'src/app/state/actions/items.actions';
import { selectItems } from 'src/app/state/selectors/items.selectors';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  items$ = this.store.pipe(select(selectItems));

  constructor(private itemService: ItemService, private store: Store) { }

  ngOnInit(): void {
    // this.itemService.getItems().subscribe(items => this.items = items);

    this.itemService.getItems().subscribe(Item => this.store.dispatch(retrievedItemList({ Item })));
  }

}
