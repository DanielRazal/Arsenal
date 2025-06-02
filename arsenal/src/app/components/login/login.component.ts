import { Component } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private titleService: TitleService, private loginService: LoginService) { }

  passwordVisible: boolean = false;
  users: User[] = [];
  user: User = new User();
  errorMessages: { [field: string]: string } = {};

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible
  }

  onLogin() {
    this.loginService.loginUser(this.user).subscribe(
      response => {
        this.errorMessages = {};
        if (response.errors && response.errors.length > 0) {
          response.errors.forEach(err => {
            if (err.includes('required')) {
              Object.keys(this.user).forEach(key => {
                if (!this.user[key as keyof User] || this.user[key as keyof User].toString().trim() === '') {
                  this.errorMessages[key as keyof User] = err;
                }
              });
            }
          })
        }
      },
      error => {
        console.error('error:', error);
      }
    );
  }
}