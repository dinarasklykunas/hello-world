import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { title } from 'process';
import { Item } from 'src/app/models/Item';
import { addItem } from '../articles/articles.actions';
import { ArticlesService } from '../articles/articles.service';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.scss']
})
export class NewItemFormComponent implements OnInit {
  newItemForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    date: new FormControl(''),
    image: new FormControl(''),
    content: new FormControl(''),
    quantity: new FormControl('')
  });

  alert: string = '';
  alertType: string = '';
  alertTimeout: object | number = null;

  constructor(
    private store: Store,
    private router: Router,
    private itemsService: ArticlesService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { title, price, date, image, content, quantity } = this.newItemForm.value;
    
    if (!this.validateForm(title, price, date, image, quantity)) {
      this.showAlert('Please fill in all fields!', 'danger');
      return;
    }

    const item: Item = { title, price, date, image, content, quantity };

    this.itemsService.createItem(item).subscribe();
    // this.store.dispatch(addItem({ id: 0, title, price, date, image, content, quantity }));
    this.showAlert('Product was added successfully', 'success');
    this.newItemForm.reset();
  }

  validateForm(
    title: string,
    price: number,
    date: string,
    image: string,
    quantity: number): boolean {
    return (!title || !price || !date || !image || quantity == null) ? false : true;
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
