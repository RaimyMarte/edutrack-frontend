import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, FormsModule, CheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  returnUrl: string = '';
  rememberMe: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }


  async onSubmit() {
    if (this.username && this.password) {
      const user = await this.authService.login(this.username, this.password);

      if (user) {
        this.router.navigate(['/']);
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter both username and password' });
    }
  }

  loginAs(role: 'admin' | 'professor') {
    if (role === 'admin') {
      this.username = 'admin';
      this.password = 'admin123';
    } else {
      this.username = 'csantana';
      this.password = 'prof123';
    }
    this.onSubmit();
  }
}
