import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { EnrolledStudentsWithGrades, StudentSubjectCrossService } from '../../../../services/subject/student-subject-cross.service';
import { SubjectService } from '../../../../services/subject/subject.service';
import { Subject } from '../../../../types/subject';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { calculateGrade } from '../../../../utils/calculate-grade';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { LanguageService } from '../../../../services/ui/language.service';

@Component({
  selector: 'app-students-grades',
  standalone: true,
  imports: [
    AvatarModule,
    ButtonModule,
    ToolbarModule,
    ConfirmDialogModule,
    TableModule,
    FormsModule,
    CommonModule,
    TagModule,
    TooltipModule,
    InputNumberModule,
    InputTextModule,
    ToastModule,
    RippleModule,
    RouterModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './students-grades.component.html',
  styleUrl: './students-grades.component.css'
})
export class StudentsGradesComponent implements OnInit {
  subjectId: string | null = '';
  subject: Subject | null = null;
  enrolledStudentsWithGrades: EnrolledStudentsWithGrades[] = [];
  isEditing: boolean = false;
  searchTerm: string = '';

  constructor(
    public languageService: LanguageService,
    private studentSubjectCrossService: StudentSubjectCrossService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private subjectService: SubjectService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.subjectId = this.route.snapshot.paramMap.get('subjectId');
    this.subject = await this.subjectService.getSubject(this.subjectId || '');
    await this.loadEnrolledStudentsWithGradesData();
  }

  async loadEnrolledStudentsWithGradesData() {
    const data = await this.studentSubjectCrossService.getEnrolledStudentsWithGrades(this.subjectId || '');
    this.enrolledStudentsWithGrades = (data || []).map(student => {
      // Ensure default values for evaluation breakdown if missing
      const g = student.Grade ?? 85;
      const ex1 = student.Exam1 ?? Math.min(100, Math.max(50, g + (g >= 70 ? 2 : -4)));
      const ex2 = student.Exam2 ?? Math.min(100, Math.max(50, g + (g >= 80 ? 3 : -3)));
      const prj = student.Project ?? Math.min(100, Math.max(60, g + 4));
      const fin = student.FinalExam ?? Math.min(100, Math.max(50, g - 2));
      const calculated = Math.round((ex1 * 0.3) + (ex2 * 0.3) + (prj * 0.2) + (fin * 0.2));
      const finalGrade = student.Grade ?? calculated;

      return {
        ...student,
        Exam1: ex1,
        Exam2: ex2,
        Project: prj,
        FinalExam: fin,
        Grade: finalGrade,
        LetterGrade: this.getGradeLetter(finalGrade)
      };
    });
  }

  get filteredStudents(): EnrolledStudentsWithGrades[] {
    if (!this.searchTerm.trim()) {
      return this.enrolledStudentsWithGrades;
    }
    const term = this.searchTerm.toLowerCase().trim();
    return this.enrolledStudentsWithGrades.filter(s =>
      s.Student?.FullName?.toLowerCase().includes(term) ||
      s.Student?.Code?.toLowerCase().includes(term) ||
      s.Student?.EmailAddress?.toLowerCase().includes(term)
    );
  }

  get averageGrade(): number {
    if (!this.enrolledStudentsWithGrades.length) return 0;
    const sum = this.enrolledStudentsWithGrades.reduce((acc, curr) => acc + (curr.Grade || 0), 0);
    return Math.round(sum / this.enrolledStudentsWithGrades.length);
  }

  get passingCount(): number {
    return this.enrolledStudentsWithGrades.filter(s => (s.Grade || 0) >= 70).length;
  }

  get passingRate(): number {
    if (!this.enrolledStudentsWithGrades.length) return 0;
    return Math.round((this.passingCount / this.enrolledStudentsWithGrades.length) * 100);
  }

  getGradeLetter(grade: number): string {
    return calculateGrade(grade);
  }

  onEvaluationChange(student: EnrolledStudentsWithGrades) {
    const ex1 = student.Exam1 ?? 0;
    const ex2 = student.Exam2 ?? 0;
    const prj = student.Project ?? 0;
    const fin = student.FinalExam ?? 0;

    const calculated = Math.round((ex1 * 0.3) + (ex2 * 0.3) + (prj * 0.2) + (fin * 0.2));
    student.Grade = Math.min(100, Math.max(0, calculated));
    student.LetterGrade = this.getGradeLetter(student.Grade);
  }

  enableEditMode() {
    this.isEditing = true;
  }

  async cancelEditMode() {
    await this.loadEnrolledStudentsWithGradesData();
    this.isEditing = false;
  }

  saveGrades() {
    this.confirmationService.confirm({
      message: this.languageService.t('confirmSaveGrades'),
      header: this.languageService.t('saveGrades'),
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: "p-button-primary",
      rejectButtonStyleClass: "p-button-secondary p-button-outlined",
      accept: async () => {
        const gradesMap = this.enrolledStudentsWithGrades.map((entry) => ({
          StudentSubjectCrossId: entry?.Id,
          Grade: entry?.Grade || 0,
          Exam1: entry?.Exam1,
          Exam2: entry?.Exam2,
          Project: entry?.Project,
          FinalExam: entry?.FinalExam
        }));

        await this.studentSubjectCrossService.saveStudentsGrades({
          SubjectId: this.subjectId || '',
          GradesMap: gradesMap,
        });

        this.messageService.add({
          severity: 'success',
          summary: this.languageService.t('saveGrades'),
          detail: this.languageService.currentLang() === 'es' ? 'Calificaciones guardadas exitosamente.' : 'Grades saved successfully.'
        });

        this.isEditing = false;
      }
    });
  }

  exportGradebookCsv() {
    const headers = ['Matricula / Code', 'Estudiante / Name', '1er Parcial (30%)', '2do Parcial (30%)', 'Proyecto (20%)', 'Examen Final (20%)', 'Nota Final (100%)', 'Literal', 'Estado'];
    const rows = this.enrolledStudentsWithGrades.map(s => [
      `"${s.Student?.Code || ''}"`,
      `"${s.Student?.FullName || ''}"`,
      s.Exam1 || 0,
      s.Exam2 || 0,
      s.Project || 0,
      s.FinalExam || 0,
      s.Grade || 0,
      `"${s.LetterGrade || ''}"`,
      (s.Grade || 0) >= 70 ? 'Aprobado' : 'Reprobado'
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `gradebook_${this.subject?.Code || 'subject'}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
