import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import '@angular/common/locales/global/lt';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { CarouselComponent } from './components/layout/carousel/carousel.component';
import { ArticlesComponent } from './components/pages/articles/articles.component';
import { NewItemComponent } from './components/pages/new-item/new-item.component';
import { EditItemComponent } from './components/pages/edit-item/edit-item.component';
import { AppRoutingModule } from './app-routing.module';
import { ArticleComponent } from './components/pages/articles/article/article.component';
import { LoginComponent } from './components/pages/login/login.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './_store';
import { CartComponent } from './components/pages/cart/cart.component';
import { CartItemComponent } from './components/pages/cart/cart-item/cart-item.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { EffectsModule } from '@ngrx/effects';
import { ArticlesEffects } from './components/pages/articles/articles.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    CarouselComponent,
    ArticlesComponent,
    NewItemComponent,
    EditItemComponent,
    ArticleComponent,
    LoginComponent,
    CartComponent,
    CartItemComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictActionTypeUniqueness: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
    EffectsModule.forRoot([
      ArticlesEffects
    ])
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'lt'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
