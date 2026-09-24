import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../types/user';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(
    private apiService: ApiService, 
    private cookieService: CookieService,
    private router: Router
  ) {
    if (typeof window !== 'undefined') {
      const token = this.getToken();
      const storedUser = localStorage.getItem('edutrack_mock_current_user');
      if (token && storedUser) {
        try {
          this.currentUserSubject.next(JSON.parse(storedUser));
        } catch (e) {}
      }
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public getToken(): string {
    if (typeof window === 'undefined') return '';
    return this.cookieService.get('token') || localStorage.getItem('token') || '';
  }

  authHeader(): { [key: string]: string } {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async checkAuth(): Promise<User | null> {
    const token = this.getToken();

    if (!token) {
      this.currentUserSubject.next(null);
      return null;
    }

    if (this.currentUserValue) {
      return this.currentUserValue;
    }

    try {
      const response = await this.apiService.get('/auth/check_auth', this.authHeader());
      const user = response?.data?.user as User;
      if (user) {
        this.currentUserSubject.next(user);
        return user;
      }
    } catch (error) {
      this.currentUserSubject.next(null);
      return null;
    }

    return null;
  }

  async login(username: string, password: string): Promise<User | null> {
    const body = {
      UserNameOrEmail: username,
      Password: password,
    };

    const response = await this.apiService.post('/auth/login', body);
    const user = response?.data?.user as User;
    const newToken = (response?.data?.token as string) || ('token-' + Date.now());

    this.cookieService.set('token', newToken, 30, '/');
    localStorage.setItem('token', newToken);
    if (user) {
      localStorage.setItem('edutrack_mock_current_user', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }

    return user;
  }

  async logout() {
    try {
      await this.apiService.post('/auth/logout', {}, this.authHeader());
    } catch (e) {}

    this.cookieService.delete('token', '/');
    this.cookieService.delete('token');
    localStorage.removeItem('token');
    localStorage.removeItem('edutrack_mock_current_user');

    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
