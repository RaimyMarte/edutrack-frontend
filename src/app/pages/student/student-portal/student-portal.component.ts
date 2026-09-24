import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../../../services/auth/auth.service';
import { LanguageService } from '../../../../services/ui/language.service';
import { StudentService } from '../../../../services/student/student.service';
import { StudentReportCardComponent } from '../../../components/student/student-report-card/student-report-card.component';
import { Student } from '../../../../types/student';
import { User } from '../../../../types/user';

@Component({
  selector: 'app-student-portal',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TabViewModule,
    TableModule,
    ButtonModule,
    CardModule,
    TagModule,
    ProgressBarModule,
    TooltipModule,
    StudentReportCardComponent
  ],
  templateUrl: './student-portal.component.html',
  styleUrls: ['./student-portal.component.css']
})
export class StudentPortalComponent implements OnInit {
  currentUser: User | null = null;
  student: Student = {
    Id: 'stu-1',
    Code: 'STU-2024-001',
    FirstName: 'Alejandro',
    LastName: 'Ramirez',
    FullName: 'Alejandro Ramirez',
    DateOfBirth: '2004-03-15',
    Age: 20,
    Gender: 'M',
    NationalityId: 1,
    EmailAddress: 'alejandro.ramirez@gmail.com',
    PhoneNumber: '(809) 555-1101',
    ParentName: 'Maria Ramirez',
    ParentPhoneNumber: '(809) 555-1102',
    Address: 'Av. 27 de Febrero #45, Santo Domingo',
    Picture: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    CreatedDate: '2024-01-10T08:00:00',
    StatusId: 1
  };

  reportCardVisible: boolean = false;
  activeTabIndex: number = 0;

  courses = [
    {
      code: 'MAT-101',
      name: 'Cálculo Diferencial',
      credits: 4,
      professor: 'Carlos Santana',
      professorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      room: 'Aula A-204',
      p1: 94,
      p2: 90,
      final: 96,
      average: 93.3,
      letter: 'A',
      status: 'approved'
    },
    {
      code: 'INF-201',
      name: 'Estructuras de Datos y Algoritmos',
      credits: 5,
      professor: 'Elena Gomez',
      professorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      room: 'Lab Computación 3',
      p1: 88,
      p2: 92,
      final: 90,
      average: 90.0,
      letter: 'A',
      status: 'approved'
    },
    {
      code: 'FIS-102',
      name: 'Física Mecánica',
      credits: 4,
      professor: 'Marco Diaz',
      professorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      room: 'Lab Física Experimental',
      p1: 82,
      p2: 85,
      final: 88,
      average: 85.0,
      letter: 'B',
      status: 'in_progress'
    },
    {
      code: 'DB-301',
      name: 'Bases de Datos Relacionales',
      credits: 4,
      professor: 'Laura Perez',
      professorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      room: 'Centro de Datos 102',
      p1: 95,
      p2: 98,
      final: 94,
      average: 95.6,
      letter: 'A',
      status: 'approved'
    }
  ];

  constructor(
    public authService: AuthService,
    public languageService: LanguageService,
    private studentService: StudentService
  ) {}

  async ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    try {
      const res = await this.studentService.getStudents({ currentPage: 1, currentPageSize: 1, search: '' });
      if (res?.students && res.students.length > 0) {
        this.student = res.students[0];
      }
    } catch (e) {
      console.error(e);
    }
  }

  get cumulativeGpa(): string {
    const totalAvg = this.courses.reduce((acc, c) => acc + c.average, 0) / (this.courses.length || 1);
    return ((totalAvg / 100) * 4.0).toFixed(2);
  }

  get totalCredits(): number {
    return this.courses.reduce((acc, c) => acc + c.credits, 0);
  }

  printIdCard() {
    window.print();
  }
}
