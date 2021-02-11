import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  @Input() loginError = Input('');
  username = '';
  password = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    
  }

  onSubmit($event: Event): void {
    $event.preventDefault();

    if (!this.username || !this.password)
      return;

    this.userService.getUsers().subscribe(users => this.users = users);
    
    // const found = this.users.find(user => user.username === this.username.value
    //   && user.password === this.password.value);
    
    // if (!found) {
    //   this.loginError.value = 'User not found';
    // }
  }

}
