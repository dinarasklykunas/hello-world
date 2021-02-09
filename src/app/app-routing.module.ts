import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { EditItemFormComponent } from './components/edit-item-form/edit-item-form.component';
import { NewItemFormComponent } from './components/new-item-form/new-item-form.component';

const routes: Routes = [
  { path: '', component: ArticlesComponent },
  { path: 'edit-item/:id', component: EditItemFormComponent },
  { path: 'new-item', component: NewItemFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }