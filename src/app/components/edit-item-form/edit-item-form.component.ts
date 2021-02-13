import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { editItem, removeItem } from '../articles/articles.actions';
import { getItemsList } from '../articles/articles.selectors';

@Component({
  selector: 'app-edit-item-form',
  templateUrl: './edit-item-form.component.html',
  styleUrls: ['./edit-item-form.component.scss']
})
export class EditItemFormComponent implements OnInit {
  id: number = 0;
  alert: string = '';

  items: Item[] = Array<Item>();
  item: Item = null;

  title = new FormControl();
  date = new FormControl();
  image = new FormControl();
  content = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.store.select(getItemsList).subscribe(items => this.items = items).unsubscribe();
    this.findItem();
    this.prefillForm();
  }

  findItem() {
    this.item = this.items.find(item => item.id === this.id);
  }

  prefillForm(): void {
    if (!this.item) {
      console.log('Item was not found')
      return;
    }

    this.title.setValue(this.item.title);
    this.date.setValue(this.item.date);
    this.image.setValue(this.item.image);
    this.content.setValue(this.item.content);
  }

  onSubmit(): void {
    if (!this.item) {
      console.log('Item was not found')
      return;
    }

    const item: Item = {
      id: this.id,
      title: this.title.value,
      date: this.date.value,
      image: this.image.value,
      content: this.content.value
    };

    this.store.dispatch(editItem(item));

    this.showAlert('Product was successfully saved!', 'success');
  }
  
  onDelete(): void {
    if (!confirm("Are you sure you want to delete this item?"))
      return;

    this.store.dispatch(removeItem({ id: this.id }));
    this.showAlert('Product was successfully deleted!', 'success');

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }

  showAlert(message: string, type: string): void {
    this.alert = message;

    setTimeout(() => {
      this.alert = '';
    }, 3000);
  }

}
