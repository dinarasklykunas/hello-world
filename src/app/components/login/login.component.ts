import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/User';
import * as fromLogin from './login.actions';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  @Input() loginError = Input('');

  alert: string = '';
  alertType: string = '';
  alertTimeout: object | number = null;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private router: Router,
    private loginService: LoginService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fromLogin.logoutUser());
    localStorage.removeItem('user');
  }

  onSubmit($event: Event): void {
    $event.preventDefault();

    const { username, password } = this.loginForm.value;

    if (!username || !password) {
      this.showAlert('Please fill in all fields!', 'danger');
      return;
    }

    this.loginService.getUsers().subscribe(users => {
      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        this.store.dispatch(fromLogin.loginUser({ user }));
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/']);
      } else {
        this.showAlert('User was not found!', 'danger');
      }
    });

  }

  showAlert(message: string, type: string, redirect: boolean = false): void {
    this.alert = message;
    this.alertType = type;
    this.alertTimeout = setTimeout(() => {
      this.alert = '';
      this.alertType = '';
      this.alertTimeout = null;
      if (redirect)
        this.router.navigate(['/']);
    }, 2000);
  }

}
