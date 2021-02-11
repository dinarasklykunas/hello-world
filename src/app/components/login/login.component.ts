import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  username = new FormControl('');
  password = new FormControl('');

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  onSubmit($event: Event): void {
    $event.preventDefault();

    if (!this.username.value || !this.password.value) {
      console.log('Please fill in all fields!');
      return;
    }
    
    const found = this.users.find(user => user.username === this.username.value);
    
    if (!found) {
      // this.loginError.value = 'User not found';
      console.log('User not found');
      return;
    }

    if (this.password.value !== found.password) {
      console.log('Password was not correct')
      return;
    }

    console.log('Logging you in...');
  }

}
