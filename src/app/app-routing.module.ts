import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { EditItemFormComponent } from './components/edit-item-form/edit-item-form.component';
import { NewItemFormComponent } from './components/new-item-form/new-item-form.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GuardsGuard } from './guards.guard';

const routes: Routes = [
  { path: '', component: ArticlesComponent },
  { path: 'edit-item/:id', component: EditItemFormComponent, canActivate: [GuardsGuard] },
  { path: 'new-item', component: NewItemFormComponent, canActivate: [GuardsGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }