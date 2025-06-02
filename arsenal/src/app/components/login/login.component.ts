import { Component } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private titleService: TitleService, private loginService: LoginService,
    private router: Router
  ) { }

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

        if (response.errors) {
          const errors = Array.isArray(response.errors) ? response.errors : [response.errors];

          const invalidUserError = errors.find(err => err.includes('Invalid email or password'));

          if (invalidUserError) {
            this.errorMessages['Password'] = invalidUserError;
          } else {
            errors.forEach(err => {
              if (err.includes('required')) {
                Object.keys(this.user).forEach(key => {
                  if (!this.user[key as keyof User] || this.user[key as keyof User].toString().trim() === '') {
                    this.errorMessages[key as keyof User] = err;
                  }
                });
              }
            });
          }
        } else {
          this.router.navigate(['/users']);
        }
      },
      error => {
        console.error('error:', error);
      }
    );
  }
}