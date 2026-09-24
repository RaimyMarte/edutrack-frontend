import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Student } from '../../../../types/student';
import { StudentService } from '../../../../services/student/student.service';
import { LanguageService } from '../../../../services/ui/language.service';

export interface ReportCardItem {
  SubjectId: string;
  SubjectCode: string;
  SubjectName: string;
  Credits: number;
  ProfessorName: string;
  Grade: number;
  Letter: string;
  Status: string;
}

@Component({
  selector: 'app-student-report-card',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    TableModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './student-report-card.component.html',
  styleUrls: ['./student-report-card.component.css']
})
export class StudentReportCardComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() student: Student | null = null;

  reportItems: ReportCardItem[] = [];
  isLoading: boolean = false;
  currentDate: Date = new Date();

  constructor(
    private studentService: StudentService,
    public languageService: LanguageService
  ) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && this.visible && this.student?.Id) {
      await this.loadReportCard();
    }
  }

  async loadReportCard() {
    if (!this.student?.Id) return;
    this.isLoading = true;
    try {
      this.reportItems = await this.studentService.getStudentReportCard(this.student.Id);
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  get averageGrade(): number {
    if (!this.reportItems || this.reportItems.length === 0) return 0;
    const total = this.reportItems.reduce((acc, curr) => acc + (curr.Grade || 0), 0);
    return Math.round((total / this.reportItems.length) * 10) / 10;
  }

  get gpa4Scale(): string {
    const avg = this.averageGrade;
    if (avg >= 90) return '4.00';
    if (avg >= 85) return '3.70';
    if (avg >= 80) return '3.30';
    if (avg >= 75) return '3.00';
    if (avg >= 70) return '2.70';
    return '2.00';
  }

  get totalCredits(): number {
    return this.reportItems.reduce((acc, curr) => acc + (curr.Credits || 3), 0);
  }

  get academicStanding(): { key: string; badgeClass: string } {
    const avg = this.averageGrade;
    if (avg >= 90) {
      return { key: 'honorRoll', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300' };
    }
    if (avg >= 70) {
      return { key: 'inGoodStanding', badgeClass: 'bg-green-100 text-green-900 border-green-300' };
    }
    return { key: 'academicProbation', badgeClass: 'bg-red-100 text-red-900 border-red-300' };
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  printTranscript() {
    window.print();
  }
}
