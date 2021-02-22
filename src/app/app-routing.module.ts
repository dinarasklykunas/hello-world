import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/pages/items/items.component';
import { EditItemComponent } from './components/pages/edit-item/edit-item.component';
import { NewItemComponent } from './components/pages/new-item/new-item.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { AdminGuard } from './auth/admin.guard';
import { UserGuard } from './auth/user.guard';

const routes: Routes = [
  { path: '', component: ArticlesComponent, canActivate: [UserGuard] },
  { path: 'edit-item/:id', component: EditItemComponent, canActivate: [AdminGuard] },
  { path: 'new-item', component: NewItemComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent, canActivate: [UserGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }