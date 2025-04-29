import { Component } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  constructor(private titleService: TitleService) {}

  passwordVisible:boolean = false;

  togglePasswordVisibility(){
    this.passwordVisible = !this.passwordVisible
  }

}
