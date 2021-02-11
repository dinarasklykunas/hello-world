import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/Item';

const httpOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsUrl: string = 'http://localhost:3000/items';

  constructor(private http: HttpClient) { }

  getItems(): Observable<Array<Item>> {
    return this.http
      .get<Item[]>(this.itemsUrl)
      // .pipe(map(items => items.items || []));
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, httpOptions);
  }

  editItem(item: Item): Observable<any> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http.put(url, item, httpOptions);
  }

  deleteItem(item: Item): Observable<any> {
    const url = `${this.itemsUrl}/${item.id}`;
    return this.http.delete(url);
  }
}
