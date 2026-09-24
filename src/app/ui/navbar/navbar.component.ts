import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { LanguageService } from '../../../services/ui/language.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonModule,
    AvatarModule,
    TooltipModule,
    OverlayPanelModule,
    BadgeModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() sidebarVisible: boolean = true;
  @Input() isMobile: boolean = false;
  @Output() sidebarVisibleChange = new EventEmitter<boolean>();

  constructor(
    public authService: AuthService,
    public languageService: LanguageService,
    public notificationService: NotificationService,
    private router: Router
  ) { }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    this.sidebarVisibleChange.emit(this.sidebarVisible);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
