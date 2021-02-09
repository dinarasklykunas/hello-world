import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/Item'

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  items: Item[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        "title": "Desktop Kit Raspberry Pi 4B 4GB RAM kit with case, keyboard and mouse",
        "date": "2021-02-04",
        "image": "./assets/img/products/desktop-kit-raspberry-pi-4b-4gb-ram-rinkinys-su-dezute-klaviatura-ir-pele-136196-228x228.jpg",
        "content": "175,00 €",
        "id": 1
      },
      {
        "title": "Desktop Kit Raspberry Pi 4B 4GB RAM kit with case, keyboard and mouse",
        "date": "2021-02-04",
        "image": "./assets/img/products/desktop-kit-raspberry-pi-4b-4gb-ram-rinkinys-su-dezute-klaviatura-ir-pele-136196-228x228.jpg",
        "content": "175,00 €",
        "id": 2
      },
      {
        "title": "Arduino Nano",
        "date": "2021-02-05",
        "image": "https://images-na.ssl-images-amazon.com/images/I/71%2BvvX%2BVCWL._AC_SX450_.jpg",
        "content": "9.99 €",
        "id": 3
      }
    ]
  }

}
