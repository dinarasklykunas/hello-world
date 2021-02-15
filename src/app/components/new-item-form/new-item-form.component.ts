import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { title } from 'process';
import { addItem } from '../articles/articles.actions';

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
  alertTimeout: object | number = null;

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { title, price, date, image, content, quantity } = this.newItemForm.value;
    
    if (!this.validateForm(title, price, date, image, content)) {
      this.showAlert('Please fill in all fields!', 'danger');
      return;
    }

    this.store.dispatch(addItem({ id: 0, title, price, date, image, content, quantity }));

    this.showAlert('Product was added successfully', 'success');
    this.newItemForm.reset();
  }

  validateForm(title: string, price: number, date: string, image: string, content: string): boolean {
    return (!title || !date || !image || !content) ? false : true;
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
