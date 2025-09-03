import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.scss']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'furkanadmin' && this.password === '996644') {
      this.router.navigate(['/admin']);
    } else {
      this.error = 'Kullanıcı adı veya şifre yanlış!';
    }
  }
}
