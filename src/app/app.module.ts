import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { NewItemFormComponent } from './components/new-item-form/new-item-form.component';
import { EditItemFormComponent } from './components/edit-item-form/edit-item-form.component';
import { AppRoutingModule } from './app-routing.module';
import { ArticleComponent } from './components/article/article.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    CarouselComponent,
    ArticlesComponent,
    NewItemFormComponent,
    EditItemFormComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
