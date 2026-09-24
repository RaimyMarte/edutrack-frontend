import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarDesktopComponent } from '../sidebar-desktop/sidebar-desktop.component';
import { SidebarMobileComponent } from '../sidebar-mobile/sidebar-mobile.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarDesktopComponent, SidebarMobileComponent],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.css'
})
export class AppSidebar {
  @Input() sidebarVisible: boolean = true;
  @Output() sidebarVisibleChange = new EventEmitter<boolean>();
  @Input() isMobile: boolean = false;

  constructor() { }
}