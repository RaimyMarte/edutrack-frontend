import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PickListModule } from 'primeng/picklist';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { StudentSubjectCrossService } from '../../../../services/subject/student-subject-cross.service';
import { SubjectService } from '../../../../services/subject/subject.service';
import { Student } from '../../../../types/student';
import { Subject } from '../../../../types/subject';
import { LanguageService } from '../../../../services/ui/language.service';

@Component({
  selector: 'app-student-subject-pick-list',
  standalone: true,
  imports: [PickListModule, AvatarModule, ButtonModule, ConfirmDialogModule, CommonModule, TagModule, TooltipModule,],
  providers: [ConfirmationService],
  templateUrl: './student-subject-pick-list.component.html',
  styleUrl: './student-subject-pick-list.component.css'
})
export class StudentSubjectPickListComponent implements OnInit {
  subjectId: string | null = ''
  subject!: Subject | null
  enrolledStudents!: Student[];
  notEnrolledStudents!: Student[];

  constructor(
    public languageService: LanguageService,
    private studentSubjectCrossService: StudentSubjectCrossService,
    private confirmationService: ConfirmationService,
    private subjectService: SubjectService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.subjectId = this.route.snapshot.paramMap.get('subjectId');

    this.subject = await this.subjectService.getSubject(this.subjectId || '');
    this.enrolledStudents = await this.studentSubjectCrossService.getEnrolledStudents(this.subjectId || '');
    this.notEnrolledStudents = await this.studentSubjectCrossService.getStudentsNotEnrolled(this.subjectId || '');
  }

  saveChanges() {
    this.confirmationService.confirm({
      message: 'Do you want to save the changes?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: "p-button-primary",
      rejectButtonStyleClass: "p-button-secondary p-button-text",
      accept: () => {
        const enrolledStudensIds = this.enrolledStudents.map((entry) => entry?.Id)
        const notEnrolledStudensIds = this.notEnrolledStudents.map((entry) => entry?.Id)

        this.studentSubjectCrossService.saveSubjectEnrollment({
          SubjectId: this.subjectId || '',
          EnrollStudents: enrolledStudensIds,
          NotEnrollStudents: notEnrolledStudensIds
        });
      }
    });
  }
}