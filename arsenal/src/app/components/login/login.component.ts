import { Component } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private titleService: TitleService, private userService: UsersService) { }

  passwordVisible: boolean = false;
  users: User[] = [];
  user: User = new User();

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible
  }

  onLogin() {
    this.userService.loginUser(this.user).subscribe(
      response => {
        console.log('התחברות הצליחה:', response);
      },
      error => {
        console.error('שגיאה:', error);
      }
    );
  }
}
