import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth/auth.service';
import { LanguageService } from '../../../services/ui/language.service';
import { SubjectService } from '../../../services/subject/subject.service';
import { StudentSubjectCrossService, EnrolledStudentsWithGrades } from '../../../services/subject/student-subject-cross.service';
import { Subject } from '../../../types/subject';
import { User } from '../../../types/user';

export type AttendanceStatus = 'present' | 'late' | 'absent' | 'excused';

export interface StudentAttendanceRow {
  studentId: string;
  studentCode: string;
  studentName: string;
  avatar: string;
  status: AttendanceStatus;
  notes?: string;
}

@Component({
  selector: 'app-attendance-tracker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    SelectButtonModule,
    CardModule,
    TagModule,
    ToolbarModule,
    TooltipModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './attendance-tracker.component.html',
  styleUrls: ['./attendance-tracker.component.css']
})
export class AttendanceTrackerComponent implements OnInit {
  currentUser: User | null = null;
  subjects: Subject[] = [];
  selectedSubjectId: string = '';
  selectedDate: string = new Date().toISOString().split('T')[0];
  loading: boolean = false;
  attendanceRecords: StudentAttendanceRow[] = [];

  statusOptions = [
    { label: 'Presente', value: 'present', styleClass: 'status-present' },
    { label: 'Tardanza', value: 'late', styleClass: 'status-late' },
    { label: 'Ausente', value: 'absent', styleClass: 'status-absent' },
    { label: 'Justificado', value: 'excused', styleClass: 'status-excused' },
  ];

  constructor(
    public authService: AuthService,
    public languageService: LanguageService,
    private subjectService: SubjectService,
    private studentSubjectCrossService: StudentSubjectCrossService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    await this.loadSubjects();
  }

  async loadSubjects() {
    try {
      this.loading = true;
      const res = await this.subjectService.getSubjects({ currentPage: 1, currentPageSize: 50, search: '' });
      let allSubjects = res?.subjects || [];
      
      // Filter if professor
      if (this.currentUser?.UserRoleId === 2) {
        allSubjects = allSubjects.filter(s => s.ProfessorId === this.currentUser?.Id);
      }

      this.subjects = allSubjects;
      if (this.subjects.length > 0) {
        this.selectedSubjectId = this.subjects[0].Id;
        await this.loadEnrolledStudents();
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  async onSubjectChange() {
    await this.loadEnrolledStudents();
  }

  async loadEnrolledStudents() {
    if (!this.selectedSubjectId) {
      this.attendanceRecords = [];
      return;
    }

    try {
      this.loading = true;
      const enrolled = (await this.studentSubjectCrossService.getEnrolledStudentsWithGrades(this.selectedSubjectId)) || [];

      this.attendanceRecords = enrolled.map((item: EnrolledStudentsWithGrades) => ({
        studentId: item.Student.Id,
        studentCode: item.Student.Code || 'STU-2024',
        studentName: item.Student.FullName,
        avatar: item.Student.Picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        status: 'present',
        notes: ''
      }));
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  markAll(status: AttendanceStatus) {
    this.attendanceRecords.forEach(r => r.status = status);
  }

  saveAttendance() {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: this.languageService.t('attendanceSavedSuccess')
    });
  }

  get selectedSubject(): Subject | undefined {
    return this.subjects.find(s => s.Id === this.selectedSubjectId);
  }

  get presentCount(): number {
    return this.attendanceRecords.filter(r => r.status === 'present').length;
  }

  get lateCount(): number {
    return this.attendanceRecords.filter(r => r.status === 'late').length;
  }

  get absentCount(): number {
    return this.attendanceRecords.filter(r => r.status === 'absent').length;
  }

  get excusedCount(): number {
    return this.attendanceRecords.filter(r => r.status === 'excused').length;
  }

  get attendanceRate(): string {
    if (this.attendanceRecords.length === 0) return '100%';
    const effectivePresent = this.presentCount + (this.lateCount * 0.8) + (this.excusedCount * 1.0);
    return ((effectivePresent / this.attendanceRecords.length) * 100).toFixed(1) + '%';
  }
}
