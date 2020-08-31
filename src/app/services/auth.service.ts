import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email: string, password: string) {
    console.log(email, password);
    return of(email, password);
  }

  checkAuth() {
    return of();
    console.log('Welcome');
  }

  logout() {
    return of();
    console.log('Bye');
  }
}
