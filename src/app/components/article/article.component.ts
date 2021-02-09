import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() item: Item = Input();

  constructor() { }

  ngOnInit(): void {
  }

}
