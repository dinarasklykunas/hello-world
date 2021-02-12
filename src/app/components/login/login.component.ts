import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  @Input() loginError = Input('');
  username = new FormControl('');
  password = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    
  }

  onSubmit($event: Event): void {
    
  }

}
