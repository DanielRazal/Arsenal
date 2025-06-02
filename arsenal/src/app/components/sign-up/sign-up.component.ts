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

  // Todo: need to implementation the ngOnChange with the validations

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
        if (response.errors && response.errors.length > 0) {
          response.errors.forEach(err => {
            if (err.includes('required')) {
              Object.keys(this.user).forEach(key => {
                if (!this.user[key as keyof User] || this.user[key as keyof User].toString().trim() === '') {
                  this.errorMessages[key as keyof User] = err;
                }
              });
            } else if (err.includes('characters')) {
              Object.keys(this.user).forEach(key => {
                this.errorMessages[key as keyof User] = err;
              })
            }
            else if (err.includes('exists')) {
              if (!this.errorMessages['Email']) {
                this.errorMessages['Email'] = err;
              }
            }
          });
        } else {
          this.errorMessages = {};
        }
      }
    );
  }


  // updateError(field: keyof User) {
  //   const value = this.user[field];
  //   if (value && this.errorMessages[field].includes('required')) {
  //     delete this.errorMessages[field];
  //   }
  //   else {
  //     this.errorMessages[field] = "The field is required.";
  //   }
  // }
}
