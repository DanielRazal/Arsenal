import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost/Arsenal/arsenal-BE/users/get.php';


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
