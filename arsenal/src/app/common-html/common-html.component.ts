import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-html',
  standalone: false,
  templateUrl: './common-html.component.html',
  styleUrl: './common-html.component.css'
})
export class CommonHtmlComponent {

  @Input() index: number = -1;

  constructor(private router: Router) {}
  
  goToLogin() {
    this.router.navigate(['/login']);
  }

}
