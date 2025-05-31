import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private titleService: Title, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setTitle(this.router.url);
      });
  }

  private setTitle(url: string) {
    if (url.includes('login')) {
      this.titleService.setTitle('Login | Arsenal');
    } else if(url.includes('register')){
      this.titleService.setTitle('Register | Arsenal');
    } else if(url.includes('sign-up')){
      this.titleService.setTitle('Sign Up | Arsenal');
    } else{
      this.titleService.setTitle('Arsenal');
    }
  }
}