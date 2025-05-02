import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-html',
  standalone: false,
  templateUrl: './common-html.component.html',
  styleUrl: './common-html.component.css'
})
export class CommonHtmlComponent {

  @Input() index: number = -1;

}
