import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AuthService } from '../../../services/auth/auth.service';
import { StudentService } from '../../../services/student/student.service';
import { SubjectService } from '../../../services/subject/subject.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../types/user';
import { Subject } from '../../../types/subject';
import { Student } from '../../../types/student';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule, TableModule, TagModule],
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

  constructor(
    public authService: AuthService,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    await this.loadDashboardData();
  }

  async loadDashboardData() {
    try {
      this.loading = true;
      const [studentsRes, subjectsRes, professors] = await Promise.all([
        this.studentService.getStudents({ currentPage: 1, currentPageSize: 5, search: '' }),
        this.subjectService.getSubjects({ currentPage: 1, currentPageSize: 5, search: '' }),
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
}
