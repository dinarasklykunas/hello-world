import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { EditItemFormComponent } from './components/edit-item-form/edit-item-form.component';
import { NewItemFormComponent } from './components/new-item-form/new-item-form.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminGuard } from './auth/admin.guard';
import { UserGuard } from './auth/user.guard';

const routes: Routes = [
  { path: '', component: ArticlesComponent, canActivate: [UserGuard] },
  { path: 'edit-item/:id', component: EditItemFormComponent, canActivate: [AdminGuard] },
  { path: 'new-item', component: NewItemFormComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent, canActivate: [UserGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }