import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { PaginationService } from '../../../../services/ui/pagination.service';
import { SearchService } from '../../../../services/ui/seach.service';
import { UserService } from '../../../../services/user/user.service';
import { PageChangeEvent } from '../../../../types/pageChangeEvent';
import { PaginationQuery } from '../../../../types/paginationQuery';
import { User } from '../../../../types/user';
import { getPageChangeDetails } from '../../../../utils/getPageChangeDetails';
import { MaintenanceService } from '../../../../services/maintenance/maintenance.service';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { UserDialogComponent } from '../../../components/user/user-dialog/user-dialog.component';
import { AvatarModule } from 'primeng/avatar';
import { LanguageService } from '../../../../services/ui/language.service';

export interface CustomUser extends Partial<User> {
  AutomaticPassword?: boolean;
  Password?: string;
  ConfirmPassword?: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableModule, ReactiveFormsModule, AvatarModule, DialogModule, TooltipModule, CheckboxModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, UserDialogComponent],
  providers: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})


export class UserListComponent implements OnInit {
  users!: CustomUser[];
  user!: CustomUser;

  totalUsers: number = 0;
  searchTerm: string = ''

  @ViewChild(UserDialogComponent) userDialogComponent!: UserDialogComponent;

  constructor(
    public languageService: LanguageService,
    private userService: UserService,
    public paginationService: PaginationService,
    private searchService: SearchService
  ) { }

  async ngOnInit() {
    await this.initializeUserList()
  }

  initializeUserList = async () => {
    const currentPage = this.paginationService.getCurrentPage();
    const rowsPerPage = this.paginationService.getItemsPerPage();
    this.searchTerm = this.searchService.getSearchTerm();

    await this.loadUsers({ currentPage: currentPage, currentPageSize: rowsPerPage, search: this.searchTerm });
  };

  async loadUsers({ currentPage, currentPageSize, search }: PaginationQuery) {
    const { users, total: totalUsers } = await this.userService.getUsers({ currentPage, currentPageSize, search });

    this.users = users
    this.totalUsers = totalUsers;
  }

  paginate(event: PageChangeEvent) {
    const { currentPage, rowsPerPage } = getPageChangeDetails(event);

    this.paginationService.onPageEvent(currentPage, rowsPerPage);
    this.loadUsers({ currentPage, currentPageSize: rowsPerPage, search: this.searchTerm });
  }

  onSearch() {
    this.searchService.onSearchEvent(this.searchTerm);
    const rowsPerPage = this.paginationService.getItemsPerPage();

    this.loadUsers({ currentPage: 1, currentPageSize: rowsPerPage, search: this.searchTerm });
  }

  onResetSearch() {
    this.searchService.onResetSearch();
    const rowsPerPage = this.paginationService.getItemsPerPage();
    this.searchTerm = ''

    this.loadUsers({ currentPage: 1, currentPageSize: rowsPerPage, search: '' });
  }

  editUser(user: CustomUser) {
    this.userDialogComponent.editUser(user)
  }

  openNew() {
    this.userDialogComponent.openNew()
  }

  resetUserPassword(user: CustomUser) {
    this.userDialogComponent.resetUserPassword(user)
  }
}