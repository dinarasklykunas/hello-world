import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Item } from 'src/app/models/Item';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  itemsURL: string = 'http://localhost:3000/items';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsURL);
  };

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsURL, item, this.httpOptions);
  }

  editItem(item: Item): Observable<Item> {
    return this.http.put<Item>(this.itemsURL + '/' + item.id, item, this.httpOptions);
  }

  deleteItem(item: Item): Observable<Item> {
    return this.http.delete<Item>(this.itemsURL + '/' + item.id);
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(`Backend returned code ${error.status}` +
        `body was: ${error.error}`);
    }

    return throwError('Something bad happened, please try again later');
  }
}
