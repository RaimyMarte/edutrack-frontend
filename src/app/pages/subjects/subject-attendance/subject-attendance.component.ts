import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PickListModule } from 'primeng/picklist';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { SubjectAttendanceService } from '../../../../services/subject/subject-attendance.service';
import { SubjectService } from '../../../../services/subject/subject.service';
import { Student } from '../../../../types/student';
import { Subject } from '../../../../types/subject';
import { InputTextModule } from 'primeng/inputtext';
import { LanguageService } from '../../../../services/ui/language.service';

@Component({
  selector: 'app-subject-attendance',
  standalone: true,
  imports: [PickListModule, AvatarModule, InputTextModule, ButtonModule, FormsModule, ConfirmDialogModule, CommonModule, TagModule, TooltipModule,],
  providers: [ConfirmationService],
  templateUrl: './subject-attendance.component.html',
  styleUrl: './subject-attendance.component.css'
})

export class SubjectAttendanceComponent implements OnInit {
  subjectId: string | null = ''
  subject!: Subject | null
  selectedDate: string = new Date().toISOString().split('T')[0];
  presentStudents!: Student[];
  absentStudents!: Student[];

  constructor(
    public languageService: LanguageService,
    private subjectAttendanceService: SubjectAttendanceService,
    private confirmationService: ConfirmationService,
    private subjectService: SubjectService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.subjectId = this.route.snapshot.paramMap.get('subjectId');
    this.subject = await this.subjectService.getSubject(this.subjectId || '');

    await this.loadAttendanceData(this.selectedDate);
  }

  async onDateChange(newDate: string) {
    this.selectedDate = newDate
    await this.loadAttendanceData(newDate);
  }

  async loadAttendanceData(date: string) {
    const data = await this.subjectAttendanceService.getSubjectAttendance(this.subjectId || '', date)
    this.presentStudents = data?.presentStudents
    this.absentStudents = data?.absentStudents
  }


  saveChanges() {
    this.confirmationService.confirm({
      message: 'Do you want to save the changes?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: "p-button-primary",
      rejectButtonStyleClass: "p-button-secondary p-button-text",
      accept: () => {
        const presentStudentsIds = this.presentStudents.map((entry) => entry?.Id)
        const absentStudentsIds = this.absentStudents.map((entry) => entry?.Id)

        this.subjectAttendanceService.saveSubjectAttendance({
          Date: this.selectedDate,
          SubjectId: this.subjectId || '',
          PresentStudents: presentStudentsIds,
          AbsentStudents: absentStudentsIds
        });
      }
    });
  }
}