import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { NonAuthGuard } from './non-auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { ProfessorDashboardComponent } from './pages/professor-dashboard/professor-dashboard.component';
import { StudentsListComponent } from './pages/student/student-list/student-list.component';
import { StudentSubjectPickListComponent } from './pages/subjects/student-subject-pick-list/student-subject-pick-list.component';
import { SubjectsListComponent } from './pages/subjects/subjects-list/subjects-list.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { SubjectAttendanceComponent } from './pages/subjects/subject-attendance/subject-attendance.component';
import { StudentsGradesComponent } from './pages/subjects/students-grades/students-grades.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { StudentPortalComponent } from './pages/student/student-portal/student-portal.component';
import { AttendanceTrackerComponent } from './pages/attendance/attendance-tracker.component';
import { FinanceManagementComponent } from './pages/finance/finance-management/finance-management.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'student-portal',
        component: StudentPortalComponent,
        canActivate: [AuthGuard],
        data: { roles: [1, 3] }
      },
      {
        path: 'attendance',
        component: AttendanceTrackerComponent,
        canActivate: [AuthGuard],
        data: { roles: [1, 2] }
      },
      {
        path: 'professor',
        component: ProfessorDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: [1, 2] }
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
        canActivate: [AuthGuard],
        data: { roles: [1, 2, 3] }
      },
      {
        path: 'subjects',
        component: SubjectsListComponent,
        canActivate: [AuthGuard],
        data: { roles: [1, 2] }
      },
      {
        path: 'subjects/enroll/:subjectId', 
        component: StudentSubjectPickListComponent,
        canActivate: [AuthGuard],
        data: { roles: [1, 2] }
      },     
      {
        path: 'subjects/attendance/:subjectId', 
        component: SubjectAttendanceComponent,
        canActivate: [AuthGuard],
        data: { roles: [1, 2] }
      },    
      {
        path: 'subjects/grades/:subjectId', 
        component: StudentsGradesComponent,
        canActivate: [AuthGuard],
        data: { roles: [1, 2] }
      },    
      {
        path: 'students',
        component: StudentsListComponent,
        canActivate: [AuthGuard],
        data: { roles: [1] }
      },
      {
        path: 'finances',
        component: FinanceManagementComponent,
        canActivate: [AuthGuard],
        data: { roles: [1] }
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [AuthGuard],
        data: { roles: [1] }
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }