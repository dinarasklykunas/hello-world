import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addItem } from '../articles/articles.actions';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.scss']
})
export class NewItemFormComponent implements OnInit {
  title = new FormControl('');
  date = new FormControl('');
  image = new FormControl('');
  content = new FormControl('');

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.validateForm())
      return;

    this.store.dispatch(addItem({
      id: 0,
      title: this.title.value,
      date: this.date.value,
      image: this.image.value,
      content: this.content.value
    }));
  }

  validateForm(): boolean {
    if (!this.title.value || !this.date.value || !this.image.value || !this.content.value)
      return false;

    return true;
  }

}
