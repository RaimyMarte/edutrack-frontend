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
import { SubjectService } from '../../../../services/subject/subject.service';
import { UserService } from '../../../../services/user/user.service';
import { Subject } from '../../../../types/subject';
import { User } from '../../../../types/user';
import { LanguageService } from '../../../../services/ui/language.service';

@Component({
  selector: 'app-subject-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, CheckboxModule, RippleModule, ButtonModule, InputTextModule, InputTextareaModule, CommonModule, DropdownModule, FormsModule,],
  templateUrl: './subject-dialog.component.html',
  styleUrl: './subject-dialog.component.css'
})
export class SubjectDialogComponent {
  subjectDialog: boolean = false;
  createMode: boolean = false;
  updateMode: boolean = false;

  @Input() subject: Partial<Subject> = {};
  @Input() initializeSubjectList!: () => void;

  subjectForm = signal<FormGroup>(
    new FormGroup({
      Name: new FormControl('', [Validators.required]),
      StartDate: new FormControl('', [Validators.required]),
      EndDate: new FormControl(null, [Validators.required]),
      Code: new FormControl(''),
      Description: new FormControl(''),
      ProfessorId: new FormControl(''),
      Enabled: new FormControl(false),
    })
  )
  submitted: boolean = false;
  professors: User[] = []

  constructor(
    public languageService: LanguageService,
    private subjectService: SubjectService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.professors = await this.userService.getProfessors()
  }

  openNew() {
    this.subject = {};
    this.subjectDialog = true;
    this.createMode = true
  }

  editSubject(subject: Subject) {
    this.subject = subject;

    this.subjectForm().patchValue({
      Name: subject.Name || '',
      StartDate: subject.StartDate,
      EndDate: subject.EndDate,
      ProfessorId: subject.ProfessorId || null,
      Description: subject.Description || '',
      Code: subject.Code || '',
      Enabled: subject.Enabled || false,
    });

    this.updateMode = true
    this.subjectDialog = true;
  }

  hideDialog() {
    this.subjectDialog = false;
    this.submitted = false;
    this.subject = {};
    this.subjectForm().reset();

    this.updateMode = false
    this.createMode = false
  }

  async saveSubject() {
    this.submitted = true;

    if (this.subjectForm().valid) {
      const formData = this.subjectForm().value

      if (this.updateMode) {
        this.subjectService.updateSubject({ subjectId: this.subject?.Id || '', body: formData });
      } else {
        this.subjectService.createSubject(formData);
      }

      this.initializeSubjectList()
      this.hideDialog()
    }
  }
}