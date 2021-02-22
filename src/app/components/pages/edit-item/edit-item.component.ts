import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/Item';
import * as itemsActions from '../items/items.actions';
import { FormGroupState } from 'ngrx-forms';
import { EditItemFormModel } from '../items/items.reducer';
import { getEditItemForm } from '../items/items.selectors';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  id: number = 0;
  formState$: Observable<FormGroupState<EditItemFormModel>>;
  
  alert: string = '';
  alertType: string = '';

  // editItemForm = new FormGroup({
  //   title: new FormControl(),
  //   price: new FormControl(),
  //   date: new FormControl(),
  //   image: new FormControl(),
  //   content: new FormControl(),
  //   quantity: new FormControl()
  // });

  alertTimeout: object | number = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(itemsActions.loadItems());
    this.store.dispatch(itemsActions.loadItem({ id: this.id }))
    this.formState$ = this.store.select(getEditItemForm);
  }

  onSubmit(): void {
    this.store.dispatch(itemsActions.editItem());
  }
  
  onDelete(): void {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    this.store.dispatch(itemsActions.deleteItem({ id: this.id }));
    this.showAlert('Product was successfully deleted!', 'success', false);
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
