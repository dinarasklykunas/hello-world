import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { removeItem } from '../articles/articles.actions';

@Component({
  selector: 'app-edit-item-form',
  templateUrl: './edit-item-form.component.html',
  styleUrls: ['./edit-item-form.component.scss']
})
export class EditItemFormComponent implements OnInit {
  id: number = 0;
  alert: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  onSubmit(): void {
    this.showAlert('"Save" function is turned off...', 'danger');
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
