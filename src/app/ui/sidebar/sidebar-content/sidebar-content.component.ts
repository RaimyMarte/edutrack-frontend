import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../services/auth/auth.service';
import { LanguageService } from '../../../../services/ui/language.service';
import { User } from '../../../../types/user';

@Component({
  selector: 'sidebar-content',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    MenuModule,
    DividerModule,
    AvatarModule,
    RippleModule
  ],
  templateUrl: './sidebar-content.component.html',
  styleUrl: './sidebar-content.component.css'
})
export class SidebarContentComponent implements OnInit, OnDestroy {
  @Input() sidebarVisible: boolean = true;
  
  menuItems: MenuItem[] = [];
  currentUser: User | null = null;
  private userSub!: Subscription;

  constructor(
    public authService: AuthService,
    public languageService: LanguageService
  ) {
    // React to language signal changes
    effect(() => {
      this.languageService.currentLang();
      this.initializeMenuItems();
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.initializeMenuItems();

    this.userSub = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.initializeMenuItems();
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  private initializeMenuItems() {
    const roleId = this.currentUser?.UserRoleId || 1;
    this.menuItems = [
      {
        label: this.languageService.t('navHome'),
        icon: 'pi pi-home',
        routerLink: '/',
        visible: true
      },
      {
        label: this.languageService.t('navSubjects'),
        icon: 'pi pi-book',
        routerLink: '/subjects',
        visible: roleId === 2 || roleId === 1
      },
      {
        label: this.languageService.t('navStudents'),
        icon: 'pi pi-address-book',
        routerLink: '/students',
        visible: roleId === 1
      },
      {
        label: this.languageService.t('navUsers'),
        icon: 'pi pi-users',
        routerLink: '/users',
        visible: roleId === 1
      }
    ];
  }
}