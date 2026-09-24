import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../../services/auth/auth.service';
import { StudentService } from '../../../services/student/student.service';
import { SubjectService } from '../../../services/subject/subject.service';
import { UserService } from '../../../services/user/user.service';
import { LanguageService } from '../../../services/ui/language.service';
import { StudentReportCardComponent } from '../../components/student/student-report-card/student-report-card.component';
import { StudentProfileDialogComponent } from '../../components/student/student-profile-dialog/student-profile-dialog.component';
import { User } from '../../../types/user';
import { Subject } from '../../../types/subject';
import { Student } from '../../../types/student';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CardModule,
    TableModule,
    TagModule,
    DialogModule,
    TooltipModule,
    AvatarModule,
    StudentReportCardComponent,
    StudentProfileDialogComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;
  totalStudents: number = 0;
  totalSubjects: number = 0;
  totalProfessors: number = 0;
  recentSubjects: Subject[] = [];
  recentStudents: Student[] = [];
  loading: boolean = true;

  // Student Profile & Report Card Dialog
  selectedStudent: Student | null = null;
  profileDialogVisible: boolean = false;
  reportCardVisible: boolean = false;

  // Grade Analytics
  analytics = {
    avgGpa: '3.72',
    passingRate: '94.6%',
    attendanceRate: '96.2%',
    gradeTiers: [
      { tier: 'Grade A (90-100)', percentage: 46, color: 'bg-green-500', count: 12 },
      { tier: 'Grade B (80-89)', percentage: 34, color: 'bg-blue-500', count: 9 },
      { tier: 'Grade C (70-79)', percentage: 14, color: 'bg-amber-500', count: 4 },
      { tier: 'Grade F (<70)', percentage: 6, color: 'bg-red-500', count: 1 }
    ]
  };

  constructor(
    public authService: AuthService,
    public languageService: LanguageService,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser?.UserRoleId === 3) {
      this.router.navigate(['/student-portal']);
      return;
    }
    if (this.currentUser?.UserRoleId === 2) {
      this.router.navigate(['/professor']);
      return;
    }
    await this.loadDashboardData();
  }

  async loadDashboardData() {
    try {
      this.loading = true;
      const [studentsRes, subjectsRes, professors] = await Promise.all([
        this.studentService.getStudents({ currentPage: 1, currentPageSize: 6, search: '' }),
        this.subjectService.getSubjects({ currentPage: 1, currentPageSize: 6, search: '' }),
        this.userService.getProfessors()
      ]);

      this.totalStudents = studentsRes?.total || 0;
      this.recentStudents = studentsRes?.students || [];

      this.totalSubjects = subjectsRes?.total || 0;
      this.recentSubjects = subjectsRes?.subjects || [];

      this.totalProfessors = professors?.length || 0;
    } catch (e) {
      console.error('Error loading dashboard:', e);
    } finally {
      this.loading = false;
    }
  }

  openStudentProfile(student: Student) {
    this.selectedStudent = student;
    this.profileDialogVisible = true;
  }

  exportSystemReport() {
    if (!this.recentStudents || this.recentStudents.length === 0) return;

    const headers = ['Code', 'First Name', 'Last Name', 'Email', 'Phone', 'Date of Birth', 'Address'];
    const rows = this.recentStudents.map(s => [
      `"${s.Code || ''}"`,
      `"${s.FirstName || ''}"`,
      `"${s.LastName || ''}"`,
      `"${s.EmailAddress || ''}"`,
      `"${s.PhoneNumber || ''}"`,
      `"${s.DateOfBirth || ''}"`,
      `"${s.Address || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EduTrack_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
