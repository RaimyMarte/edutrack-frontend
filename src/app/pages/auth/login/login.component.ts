import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../../../services/auth/auth.service';
import { LanguageService } from '../../../../services/ui/language.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, FormsModule, CheckboxModule, TooltipModule],
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
    private route: ActivatedRoute,
    private authService: AuthService,
    public languageService: LanguageService,
    private messageService: MessageService
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async onSubmit() {
    if (this.username) {
      const pwd = this.password || 'password123';
      try {
        const user = await this.authService.login(this.username, pwd);
        if (user) {
          await this.router.navigateByUrl(this.returnUrl || '/');
        }
      } catch (err: any) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message || 'Login failed' });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: this.languageService.currentLang() === 'en' ? 'Please enter username or email' : 'Por favor ingresa usuario o correo'
      });
    }
  }
}
