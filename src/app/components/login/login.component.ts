import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/home']);
      }
    });
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(user => {
      this.router.navigate(['/home']);
    });
  }

}
