import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { MaintenanceService } from '../../../../services/maintenance/maintenance.service';
import { StudentService } from '../../../../services/student/student.service';
import { Maintenance } from '../../../../types/maintenance';
import { Student } from '../../../../types/student';
import { LanguageService } from '../../../../services/ui/language.service';

@Component({
  selector: 'app-student-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, CheckboxModule, RippleModule, ButtonModule, InputTextModule, InputTextareaModule, CommonModule, DropdownModule, FormsModule,],
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.css'
})
export class StudentDialogComponent {
  studentDialog: boolean = false;
  createMode: boolean = false;
  updateMode: boolean = false;

  get genderOptions() {
    return [
      { Id: 'M', Name: this.languageService.t('male') },
      { Id: 'F', Name: this.languageService.t('female') },
      { Id: 'U', Name: this.languageService.t('other') },
    ];
  }

  @Input() student: Partial<Student> = {};
  @Input() initializeStudentList!: () => void;

  studentForm = signal<FormGroup>(
    new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      Code: new FormControl(''),
      DateOfBirth: new FormControl('', [Validators.required]),
      Address: new FormControl(''),
      NationalityId: new FormControl(''),
      Gender: new FormControl(''),
      EmailAddress: new FormControl(''),
      PhoneNumber: new FormControl(''),
      ParentName: new FormControl(''),
      ParentPhoneNumber: new FormControl(''),
    })
  )
  submitted: boolean = false;
  nationalities: Maintenance[] = []

  constructor(
    public languageService: LanguageService,
    private studentService: StudentService,
    private maintenanceService: MaintenanceService
  ) { }

  async ngOnInit() {
    const selectedMaintenances = ['Nationality']
    const data = await this.maintenanceService.getSelectedMaintenances(selectedMaintenances);
    this.nationalities = data?.Nationality
  }

  openNew() {
    this.student = {};
    this.studentDialog = true;
    this.createMode = true
  }

  editStudent(student: Student) {
    this.student = student;

    this.studentForm().patchValue({
      FirstName: student.FirstName || '',
      LastName: student.LastName || '',
      Code: student.Code || '',
      DateOfBirth: student.DateOfBirth || '',
      Address: student.Address,
      NationalityId: student.NationalityId || null,
      Gender: student.Gender || null,
      PhoneNumber: student.PhoneNumber || '',
      EmailAddress: student.EmailAddress || '',
      ParentName: student.ParentName || '',
      ParentPhoneNumber: student.ParentPhoneNumber || ''
    });

    this.updateMode = true
    this.studentDialog = true;
  }

  hideDialog() {
    this.studentDialog = false;
    this.submitted = false;
    this.student = {};
    this.studentForm().reset();

    this.updateMode = false
    this.createMode = false
  }

  saveStudent() {
    this.submitted = true;

    if (this.studentForm().valid) {
      const formData = this.studentForm().value

      if (this.updateMode) {
        this.studentService.updateStudent({ studentId: this.student?.Id || '', body: formData });
      } else {
        this.studentService.createStudent(formData);
      }

      this.initializeStudentList()
      this.hideDialog()
    }
  }
}