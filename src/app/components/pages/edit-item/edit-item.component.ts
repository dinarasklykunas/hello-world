import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { editItem, removeItem, setItems } from '../articles/articles.actions';
import { getItemsList } from '../articles/articles.selectors';
import { ArticlesService } from '../articles/articles.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  // -------------------------------------------------- SUTVARKYTI ! --------------------------------------------------------------
  id: number = 0;
  alert: string = '';
  alertType: string = '';

  storeSubsription: Subscription = null;

  items: Item[] = [];
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
    private store: Store,
    private itemsService: ArticlesService
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.prefillForm();
  }

  ngOnDestroy(): void {
    this.storeSubsription.unsubscribe();
  }

  prefillForm(): void {
    this.storeSubsription = this.itemsService.getItems().subscribe(items => {
      this.store.dispatch(setItems({ items }));
      this.item = items.find(item => item.id === this.id);
      
      if (!this.item) {
        this.showAlert('Product was not found', 'danger');
        return;
      }
  
      const { title, price, date, image, content, quantity } = this.editItemForm.controls;
  
      title.setValue(this.item.title);
      price.setValue(this.item.price);
      date.setValue(this.item.date);
      image.setValue(this.item.image);
      content.setValue(this.item.content);
      quantity.setValue(this.item.quantity);
    });
  }

  onSubmit(): void {
    if (!this.item) {
      this.showAlert('Product was not found', 'danger');
      return;
    }
    
    const { title, price, date, image, content, quantity } = this.editItemForm.value;

    if (!this.validateForm(title, price, date, image, quantity)) {
      this.showAlert('Please fill in all fields!', 'danger');
      return;
    }

    const item: Item = { id: this.id, title, price, date, image, content, quantity };
    
    // return this.showAlert('Product editing function is disabled', 'danger');

    this.itemsService.editItem(item).subscribe();
    // this.store.dispatch(editItem(item));
    this.showAlert('Product was successfully saved!', 'success');
  }
  
  onDelete(): void {
    if (!confirm("Are you sure you want to delete this item?")) return;

    this.itemsService.deleteItem(this.item).subscribe();
    // this.store.dispatch(removeItem({ id: this.id }));
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
