import { Component } from '@angular/core';
import { TitleService } from '../../services/title.service';

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

  constructor(private titleService: TitleService) { }

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
}
