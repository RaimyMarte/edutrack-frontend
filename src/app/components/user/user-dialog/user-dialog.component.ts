import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaintenanceService } from '../../../../services/maintenance/maintenance.service';
import { UserService } from '../../../../services/user/user.service';
import { Maintenance } from '../../../../types/maintenance';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { CustomUser } from '../../../pages/user/user-list/user-list.component';
import { LanguageService } from '../../../../services/ui/language.service';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, CheckboxModule, RippleModule, ButtonModule, InputTextModule, InputTextareaModule, CommonModule, DropdownModule, FormsModule,],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent implements OnInit {
  userDialog: boolean = false;
  createMode: boolean = false;
  updateMode: boolean = false;
  resetPasswordMode: boolean = false;

  @Input() user: CustomUser = {};
  @Input() initializeUserList!: () => void;

  userForm = signal<FormGroup>(
    new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      UserName: new FormControl('', [Validators.required]),
      UserRoleId: new FormControl(null, [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Phone: new FormControl(''),
      Authorized: new FormControl(false),
      AutomaticPassword: new FormControl(true),
      ChangePwdNextLogin: new FormControl(false),
      Password: new FormControl(''),
      ConfirmPassword: new FormControl('')
    })
  )
  submitted: boolean = false;
  userRoles: Maintenance[] = []

  constructor(
    public languageService: LanguageService,
    private userService: UserService,
    private maintenanceService: MaintenanceService
  ) { }

  async ngOnInit() {
    const selectedMaintenances = ['UserRole']
    const data = await this.maintenanceService.getSelectedMaintenances(selectedMaintenances);
    this.userRoles = data?.UserRole

    // Toggle Password and Confirm Password based on AutomaticPassword
    this.userForm().get('AutomaticPassword')?.valueChanges.subscribe(value => {
      if (value) {
        this.userForm().get('Password')?.clearValidators();
        this.userForm().get('ConfirmPassword')?.clearValidators();
      } else {
        this.userForm().get('Password')?.setValidators([Validators.required]);
        this.userForm().get('ConfirmPassword')?.setValidators([Validators.required]);
      }
      this.userForm().get('Password')?.updateValueAndValidity();
      this.userForm().get('ConfirmPassword')?.updateValueAndValidity();
    });


  }

  openNew() {
    this.user = {};
    this.userDialog = true;
    this.createMode = true
  }

  resetUserPassword(user: CustomUser) {
    this.userForm().get('FirstName')?.clearValidators();
    this.userForm().get('LastName')?.clearValidators();
    this.userForm().get('UserName')?.clearValidators();
    this.userForm().get('Email')?.clearValidators();
    this.userForm().get('UserRoleId')?.clearValidators();

    this.user = { ...user };
    this.resetPasswordMode = true
    this.userDialog = true;
  }

  editUser(user: CustomUser) {
    this.userForm().get('Password')?.clearValidators();
    this.userForm().get('ConfirmPassword')?.clearValidators();

    this.user = user;

    this.userForm().patchValue({
      FirstName: user.FirstName || '',
      LastName: user.LastName || '',
      UserName: user.UserName || '',
      UserRoleId: user.UserRoleId || null,
      Email: user.Email || '',
      Phone: user.Phone || '',
      Authorized: user.Authorized || false,
      ChangePwdNextLogin: user.ChangePwdNextLogin || false,
    });

    this.updateMode = true
    this.userDialog = true;
  }

  hideDialog() {
    this.submitted = false;
    this.user = {};
    this.userForm().reset();

    this.updateMode = false
    this.createMode = false
    this.resetPasswordMode = false
    this.userDialog = false;
  }

  saveUser() {
    this.submitted = true;

    if (this.userForm().valid) {
      const formData = this.userForm().value

      if (this.updateMode) {
        this.userService.updateUser({ UserId: this.user?.Id, ...formData });
      }

      else if (this.resetPasswordMode) {
        this.userService.adminResetPassword({ userId: this.user?.Id, ...formData });
      }
      else {
        this.userService.createUser(formData);
      }

      this.initializeUserList()
      this.hideDialog()
    }
  }
}
