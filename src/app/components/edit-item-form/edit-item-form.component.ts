import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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

  storeSubsription: Subscription = null;

  items: Item[] = Array<Item>();
  item: Item = null;

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
    this.storeSubsription = this.store.select(getItemsList).subscribe(items => this.items = items);
    this.findItem();
    this.prefillForm();
  }

  ngOnDestroy(): void {
    this.storeSubsription.unsubscribe();
  }

  findItem() {
    this.item = this.items.find(item => item.id === this.id);
  }

  prefillForm(): void {
    if (!this.item) {
      console.log('Product was not found')
      return;
    }

    const { title, price, date, image, content, quantity } = this.editItemForm.controls;

    title.setValue(this.item.title);
    price.setValue(this.item.price);
    date.setValue(this.item.date);
    image.setValue(this.item.image);
    content.setValue(this.item.content);
    quantity.setValue(this.item.quantity);
  }

  onSubmit(): void {
    if (!this.item) {
      this.showAlert('Item was not found', 'danger');
      return;
    }
    
    const { title, price, date, image, content, quantity } = this.editItemForm.value;

    if (!this.validateForm(title, price, date, image, quantity)) {
      this.showAlert('Please fill in all fields!', 'danger');
      return;
    }

    const item: Item = { id: this.id, title, price, date, image, content, quantity };
    
    // return this.showAlert('Product editing function is disabled', 'danger');

    if (this.showAlert('Product was successfully saved!', 'success')) {
      this.store.dispatch(editItem(item));
    }
  }
  
  onDelete(): void {
    if (!confirm("Are you sure you want to delete this item?")) return;

    if(this.showAlert('Product was successfully deleted!', 'success', true)) {
      this.store.dispatch(removeItem({ id: this.id }));
    }
  }

  validateForm(
    title: string,
    price: number,
    date: string,
    image: string,
    content: string): boolean {
    return (!title || !price || !date || !image || !content) ? false : true;
  }

  showAlert(message: string, type: string, redirect: boolean = false): boolean {
    if (this.alertTimeout) return false;
    
    this.alert = message;
    this.alertTimeout = setTimeout(() => {
      this.alert = '';
      this.alertTimeout = null;
      if (redirect)
        this.router.navigate(['/']);
    }, 1500);
    
    return true;
  }

}
