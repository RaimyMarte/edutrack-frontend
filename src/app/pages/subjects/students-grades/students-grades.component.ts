import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { EnrolledStudentsWithGrades, StudentSubjectCrossService } from '../../../../services/subject/student-subject-cross.service';
import { SubjectService } from '../../../../services/subject/subject.service';
import { Subject } from '../../../../types/subject';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { calculateGrade } from '../../../../utils/calculate-grade'
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { LanguageService } from '../../../../services/ui/language.service';

@Component({
  selector: 'app-students-grades',
  standalone: true,
  imports: [AvatarModule, ButtonModule, ToolbarModule, ConfirmDialogModule, TableModule, FormsModule, CommonModule, TagModule, TooltipModule, InputNumberModule],
  providers: [ConfirmationService],
  templateUrl: './students-grades.component.html',
  styleUrl: './students-grades.component.css'
})
export class StudentsGradesComponent {
  subjectId: string | null = ''
  subject!: Subject | null
  enrolledStudentsWithGrades!: EnrolledStudentsWithGrades[];
  isEditing: boolean = false;

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
    await this.loadEnrolledStudentsWithGradesData()
  }

  async loadEnrolledStudentsWithGradesData() {
    this.enrolledStudentsWithGrades = await this.studentSubjectCrossService.getEnrolledStudentsWithGrades(this.subjectId || '');
  }

  getGradeLetter(grade: number): string {
    return calculateGrade(grade)
  }

  enableEditMode() {
    this.isEditing = true;
  }

  async cancelEditMode() {
    await this.loadEnrolledStudentsWithGradesData()
    this.isEditing = false;
  }


  saveGrades() {
    this.confirmationService.confirm({
      message: 'Do you want to save the Grades?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: "p-button-primary",
      rejectButtonStyleClass: "p-button-secondary p-button-text",
      accept: () => {
        const gradesMap = this.enrolledStudentsWithGrades.map((entry) => ({
          StudentSubjectCrossId: entry?.Id,
          Grade: entry?.Grade || 0
        }))

        this.studentSubjectCrossService.saveStudentsGrades({
          SubjectId: this.subjectId || '',
          GradesMap: gradesMap,
        });

        this.isEditing = false;
      }
    });
  }
}
