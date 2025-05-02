import { Component } from '@angular/core';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private titleService: TitleService) { }

}
