import { Component } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private titleService: TitleService, private router: Router) { }


  navigateToEmailPage() {
    this.router.navigate(['/sign-up']);
  }
}
