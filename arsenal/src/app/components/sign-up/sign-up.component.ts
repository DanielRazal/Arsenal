import { Component } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { RegisterService } from '../../services/register.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  date: string = '';
  showError: boolean = false;
  showSecondCard: boolean = false;
  user: User = new User();
  errorMessages: { [field: string]: string } = {};

  constructor(private titleService: TitleService,
    private registerService: RegisterService) { }

  onContinue() {
    this.validateDate();
    if (!this.showError) {
      this.showSecondCard = true;
    }
  }

  validateDate() {
    this.showError = this.date === '' || this.date === null;
  }

  passwordVisible: boolean = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible
  }

  onRegister() {
    this.registerService.registerUser(this.user).subscribe(
      response => {
        this.errorMessages = {};
        if (response.errors) {
          response.errors.forEach(err => {
            if (err.includes('FirstName')) {
              this.errorMessages['FirstName'] = err;
            } else if (err.includes('LastName')) {
              this.errorMessages['LastName'] = err;
            } else if (err.includes('Email')) {
              this.errorMessages['Email'] = err;
            } else if (err.includes('Password')) {
              this.errorMessages['Password'] = err;
            }
          });
        } else {
          this.errorMessages = {};
        }
      },
    );
  }

  updateError(field: string) {
    delete this.errorMessages[field];
  }
}
