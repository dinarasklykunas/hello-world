import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';
import * as articlesActions from '../articles/articles.actions';
import { getItemsList } from '../articles/articles.selectors';
import { ArticlesService } from '../articles/articles.service';
import { getSelectedItem } from '../articles/article/article.selectors';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  id: number = 0;
  alert: string = '';
  alertType: string = '';

  items: Item[] = [];
  item$: Observable<Item> = null;

  editItemForm = new FormGroup({
    title: new FormControl(),
    price: new FormControl(),
    date: new FormControl(),
    image: new FormControl(),
    content: new FormControl(),
    quantity: new FormControl()
  });

  alertTimeout: object | number = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(articlesActions.loadItems());
    this.store.dispatch(articlesActions.loadItem({ id: this.id }))
    this.item$ = this.store.select(getSelectedItem);
  }

  onSubmit(): void {
    // if (!this.item) {
    //   this.showAlert('Product was not found', 'danger');
    //   return;
    // }
    
    const { title, price, date, image, content, quantity } = this.editItemForm.value;

    if (!this.validateForm(title, price, date, image, quantity)) {
      this.showAlert('Please fill in all fields!', 'danger');
      return;
    }

    const item: Item = { id: this.id, title, price, date, image, content, quantity };

    this.store.dispatch(articlesActions.editItem(item));
    this.showAlert('Product was successfully saved!', 'success');
  }
  
  onDelete(): void {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    this.store.dispatch(articlesActions.deleteItem({ id: this.id }));
    this.showAlert('Product was successfully deleted!', 'success', true);
  }

  validateForm(
    title: string,
    price: number,
    date: string,
    image: string,
    quantity: number): boolean {
    return (!title || !price || !date || !image || quantity == null || quantity < 0) ? false : true;
  }

  showAlert(message: string, type: string, redirect: boolean = false): void {
  this.alert = message;
  this.alertType = type;
  this.alertTimeout = setTimeout(() => {
    this.alert = '';
    this.alertType = '';
    this.alertTimeout = null;
    if (redirect)
      this.router.navigate(['/']);
  }, 2000);
}

}
