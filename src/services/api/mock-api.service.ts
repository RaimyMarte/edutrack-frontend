import { Injectable } from '@angular/core';
import { User } from '../../types/user';
import { Student } from '../../types/student';
import { Subject } from '../../types/subject';
import { EnrolledStudentsWithGrades } from '../subject/student-subject-cross.service';
import { calculateGrade } from '../../utils/calculate-grade';

const STORAGE_KEYS = {
  USERS: 'edutrack_mock_users',
  STUDENTS: 'edutrack_mock_students',
  SUBJECTS: 'edutrack_mock_subjects',
  ENROLLMENTS: 'edutrack_mock_enrollments',
  ATTENDANCE: 'edutrack_mock_attendance',
  CURRENT_USER: 'edutrack_mock_current_user',
};

const INITIAL_USERS: User[] = [
  {
    Id: 'usr-1',
    FirstName: 'Raimy',
    LastName: 'Marte',
    UserName: 'admin',
    FullName: 'Raimy Marte',
    Gender: 'M',
    Email: 'admin@edutrack.com',
    Phone: '(809) 555-0101',
    ChangePwdNextLogin: false,
    LastPwdChangedDate: new Date('2024-01-10T10:00:00'),
    UserRoleId: 1,
    Authorized: true,
    Locked: false,
    LockedDate: null,
    Deleted: false,
    DeletedDate: null,
    CreatedBy: 'system',
    CreatedDate: new Date('2024-01-01T08:00:00'),
    LastUpdatedBy: null,
    LastUpdatedDate: null,
    LastIpAccess: '192.168.1.10',
    LastAccessDate: new Date(),
    Picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    UserRole: { Name: 'Admin' },
  },
  {
    Id: 'usr-2',
    FirstName: 'Carlos',
    LastName: 'Santana',
    UserName: 'csantana',
    FullName: 'Carlos Santana',
    Gender: 'M',
    Email: 'csantana@edutrack.com',
    Phone: '(809) 555-0102',
    ChangePwdNextLogin: false,
    LastPwdChangedDate: new Date('2024-02-15T09:30:00'),
    UserRoleId: 2,
    Authorized: true,
    Locked: false,
    LockedDate: null,
    Deleted: false,
    DeletedDate: null,
    CreatedBy: 'admin',
    CreatedDate: new Date('2024-01-05T10:00:00'),
    LastUpdatedBy: null,
    LastUpdatedDate: null,
    LastIpAccess: '192.168.1.15',
    LastAccessDate: new Date(),
    Picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    UserRole: { Name: 'Professor' },
  },
  {
    Id: 'usr-3',
    FirstName: 'Elena',
    LastName: 'Gomez',
    UserName: 'egomez',
    FullName: 'Elena Gomez',
    Gender: 'F',
    Email: 'egomez@edutrack.com',
    Phone: '(809) 555-0103',
    ChangePwdNextLogin: false,
    LastPwdChangedDate: null,
    UserRoleId: 2,
    Authorized: true,
    Locked: false,
    LockedDate: null,
    Deleted: false,
    DeletedDate: null,
    CreatedBy: 'admin',
    CreatedDate: new Date('2024-01-08T11:00:00'),
    LastUpdatedBy: null,
    LastUpdatedDate: null,
    LastIpAccess: '192.168.1.20',
    LastAccessDate: new Date(),
    Picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    UserRole: { Name: 'Professor' },
  },
  {
    Id: 'usr-4',
    FirstName: 'Marco',
    LastName: 'Diaz',
    UserName: 'mdiaz',
    FullName: 'Marco Diaz',
    Gender: 'M',
    Email: 'mdiaz@edutrack.com',
    Phone: '(809) 555-0104',
    ChangePwdNextLogin: false,
    LastPwdChangedDate: null,
    UserRoleId: 2,
    Authorized: true,
    Locked: false,
    LockedDate: null,
    Deleted: false,
    DeletedDate: null,
    CreatedBy: 'admin',
    CreatedDate: new Date('2024-01-12T14:00:00'),
    LastUpdatedBy: null,
    LastUpdatedDate: null,
    LastIpAccess: '192.168.1.25',
    LastAccessDate: new Date(),
    Picture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    UserRole: { Name: 'Professor' },
  },
  {
    Id: 'usr-5',
    FirstName: 'Laura',
    LastName: 'Perez',
    UserName: 'lperez',
    FullName: 'Laura Perez',
    Gender: 'F',
    Email: 'lperez@edutrack.com',
    Phone: '(809) 555-0105',
    ChangePwdNextLogin: false,
    LastPwdChangedDate: null,
    UserRoleId: 2,
    Authorized: true,
    Locked: false,
    LockedDate: null,
    Deleted: false,
    DeletedDate: null,
    CreatedBy: 'admin',
    CreatedDate: new Date('2024-01-15T09:00:00'),
    LastUpdatedBy: null,
    LastUpdatedDate: null,
    LastIpAccess: '192.168.1.30',
    LastAccessDate: new Date(),
    Picture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    UserRole: { Name: 'Professor' },
  },
];

const INITIAL_STUDENTS: Student[] = [
  {
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
    StatusId: 1,
    Picture: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    CreatedDate: '2024-01-10T10:00:00',
    CreatedBy: 'admin',
    LastUpdatedDate: null,
    LastUpdatedBy: null,
  },
  {
    Id: 'stu-2',
    Code: 'STU-2024-002',
    FirstName: 'Sofia',
    LastName: 'Morales',
    FullName: 'Sofia Morales',
    DateOfBirth: '2005-07-22',
    Age: 19,
    Gender: 'F',
    NationalityId: 1,
    EmailAddress: 'sofia.morales@gmail.com',
    PhoneNumber: '(809) 555-1201',
    ParentName: 'Roberto Morales',
    ParentPhoneNumber: '(809) 555-1202',
    Address: 'Calle Las Damas #12, Santo Domingo',
    StatusId: 1,
    Picture: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    CreatedDate: '2024-01-11T10:00:00',
    CreatedBy: 'admin',
    LastUpdatedDate: null,
    LastUpdatedBy: null,
  },
  {
    Id: 'stu-3',
    Code: 'STU-2024-003',
    FirstName: 'Diego',
    LastName: 'Castillo',
    FullName: 'Diego Castillo',
    DateOfBirth: '2003-11-05',
    Age: 21,
    Gender: 'M',
    NationalityId: 2,
    EmailAddress: 'diego.castillo@gmail.com',
    PhoneNumber: '(809) 555-1301',
    ParentName: 'Ana Castillo',
    ParentPhoneNumber: '(809) 555-1302',
    Address: 'Av. Winston Churchill #100, Santo Domingo',
    StatusId: 1,
    Picture: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150',
    CreatedDate: '2024-01-12T10:00:00',
    CreatedBy: 'admin',
    LastUpdatedDate: null,
    LastUpdatedBy: null,
  },
  {
    Id: 'stu-4',
    Code: 'STU-2024-004',
    FirstName: 'Valentina',
    LastName: 'Reyes',
    FullName: 'Valentina Reyes',
    DateOfBirth: '2004-09-18',
    Age: 20,
    Gender: 'F',
    NationalityId: 3,
    EmailAddress: 'valentina.reyes@gmail.com',
    PhoneNumber: '(809) 555-1401',
    ParentName: 'Jorge Reyes',
    ParentPhoneNumber: '(809) 555-1402',
    Address: 'Calle del Sol #78, Santiago',
    StatusId: 1,
    Picture: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
    CreatedDate: '2024-01-15T10:00:00',
    CreatedBy: 'admin',
    LastUpdatedDate: null,
    LastUpdatedBy: null,
  },
  {
    Id: 'stu-5',
    Code: 'STU-2024-005',
    FirstName: 'Mateo',
    LastName: 'Hernandez',
    FullName: 'Mateo Hernandez',
    DateOfBirth: '2005-01-30',
    Age: 19,
    Gender: 'M',
    NationalityId: 1,
    EmailAddress: 'mateo.hernandez@gmail.com',
    PhoneNumber: '(809) 555-1501',
    ParentName: 'Clara Hernandez',
    ParentPhoneNumber: '(809) 555-1502',
    Address: 'Av. Abraham Lincoln #220, Santo Domingo',
    StatusId: 1,
    Picture: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    CreatedDate: '2024-01-18T10:00:00',
    CreatedBy: 'admin',
    LastUpdatedDate: null,
    LastUpdatedBy: null,
  },
  {
    Id: 'stu-6',
    Code: 'STU-2024-006',
    FirstName: 'Camila',
    LastName: 'Vargas',
    FullName: 'Camila Vargas',
    DateOfBirth: '2004-12-12',
    Age: 20,
    Gender: 'F',
    NationalityId: 4,
    EmailAddress: 'camila.vargas@gmail.com',
    PhoneNumber: '(809) 555-1601',
    ParentName: 'Luis Vargas',
    ParentPhoneNumber: '(809) 555-1602',
    Address: 'Calle El Conde #305, Santo Domingo',
    StatusId: 1,
    Picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    CreatedDate: '2024-01-20T10:00:00',
    CreatedBy: 'admin',
    LastUpdatedDate: null,
    LastUpdatedBy: null,
  },
  {
    Id: 'stu-7',
    Code: 'STU-2024-007',
    FirstName: 'Gabriel',
    LastName: 'Navarro',
    FullName: 'Gabriel Navarro',
    DateOfBirth: '2003-05-25',
    Age: 21,
    Gender: 'M',
    NationalityId: 1,
    EmailAddress: 'gabriel.navarro@gmail.com',
    PhoneNumber: '(809) 555-1701',
    ParentName: 'Patricia Navarro',
    ParentPhoneNumber: '(809) 555-1702',
    Address: 'Av. Independencia #88, Santo Domingo',
    StatusId: 1,
    Picture: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    CreatedDate: '2024-01-22T10:00:00',
    CreatedBy: 'admin',
    LastUpdatedDate: null,
    LastUpdatedBy: null,
  },
  {
    Id: 'stu-8',
    Code: 'STU-2024-008',
    FirstName: 'Isabella',
    LastName: 'Torres',
    FullName: 'Isabella Torres',
    DateOfBirth: '2005-04-10',
    Age: 19,
    Gender: 'F',
    NationalityId: 5,
    EmailAddress: 'isabella.torres@gmail.com',
    PhoneNumber: '(809) 555-1801',
    ParentName: 'Fernando Torres',
    ParentPhoneNumber: '(809) 555-1802',
    Address: 'Calle Bella Vista #14, Santo Domingo',
    StatusId: 1,
    Picture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    CreatedDate: '2024-01-25T10:00:00',
    CreatedBy: 'admin',
    LastUpdatedDate: null,
    LastUpdatedBy: null,
  },
];

const INITIAL_SUBJECTS: Subject[] = [
  {
    Id: 'sub-1',
    Code: 'MAT-101',
    Name: 'Cálculo Diferencial',
    Description: 'Fundamentos de límites, derivadas y aplicaciones prácticas en ingeniería.',
    Enabled: true,
    StatusId: 1,
    StartDate: '2024-09-01',
    EndDate: '2024-12-20',
    ProfessorId: 'usr-2',
    CreatedBy: 'admin',
    CreatedDate: '2024-08-15T10:00:00',
    LastUpdatedBy: null,
    LastUpdatedDate: null,
  },
  {
    Id: 'sub-2',
    Code: 'INF-201',
    Name: 'Estructuras de Datos y Algoritmos',
    Description: 'Árboles, grafos, ordenamiento y análisis de complejidad algorítmica.',
    Enabled: true,
    StatusId: 1,
    StartDate: '2024-09-01',
    EndDate: '2024-12-20',
    ProfessorId: 'usr-3',
    CreatedBy: 'admin',
    CreatedDate: '2024-08-16T10:00:00',
    LastUpdatedBy: null,
    LastUpdatedDate: null,
  },
  {
    Id: 'sub-3',
    Code: 'FIS-102',
    Name: 'Física Mecánica',
    Description: 'Cinemática, dinámica, leyes de conservación y mecánica clásica.',
    Enabled: true,
    StatusId: 1,
    StartDate: '2024-09-01',
    EndDate: '2024-12-20',
    ProfessorId: 'usr-4',
    CreatedBy: 'admin',
    CreatedDate: '2024-08-17T10:00:00',
    LastUpdatedBy: null,
    LastUpdatedDate: null,
  },
  {
    Id: 'sub-4',
    Code: 'DB-301',
    Name: 'Bases de Datos Relacionales',
    Description: 'Diseño conceptual, SQL avanzado, normalización y optimización de índices.',
    Enabled: true,
    StatusId: 1,
    StartDate: '2024-09-01',
    EndDate: '2024-12-20',
    ProfessorId: 'usr-5',
    CreatedBy: 'admin',
    CreatedDate: '2024-08-18T10:00:00',
    LastUpdatedBy: null,
    LastUpdatedDate: null,
  },
];

interface MockEnrollment {
  Id: string;
  SubjectId: string;
  StudentId: string;
  Grade: number | null;
  CreatedDate: Date;
  CreatedBy: string | null;
}

const INITIAL_ENROLLMENTS: MockEnrollment[] = [
  { Id: 'enr-1', SubjectId: 'sub-1', StudentId: 'stu-1', Grade: 95, CreatedDate: new Date('2024-09-01'), CreatedBy: 'admin' },
  { Id: 'enr-2', SubjectId: 'sub-1', StudentId: 'stu-2', Grade: 88, CreatedDate: new Date('2024-09-01'), CreatedBy: 'admin' },
  { Id: 'enr-3', SubjectId: 'sub-1', StudentId: 'stu-3', Grade: 78, CreatedDate: new Date('2024-09-01'), CreatedBy: 'admin' },
  { Id: 'enr-4', SubjectId: 'sub-1', StudentId: 'stu-4', Grade: 92, CreatedDate: new Date('2024-09-01'), CreatedBy: 'admin' },
  { Id: 'enr-5', SubjectId: 'sub-2', StudentId: 'stu-1', Grade: 90, CreatedDate: new Date('2024-09-01'), CreatedBy: 'admin' },
  { Id: 'enr-6', SubjectId: 'sub-2', StudentId: 'stu-5', Grade: 85, CreatedDate: new Date('2024-09-01'), CreatedBy: 'admin' },
  { Id: 'enr-7', SubjectId: 'sub-2', StudentId: 'stu-6', Grade: 98, CreatedDate: new Date('2024-09-01'), CreatedBy: 'admin' },
  { Id: 'enr-8', SubjectId: 'sub-3', StudentId: 'stu-2', Grade: 72, CreatedDate: new Date('2024-09-01'), CreatedBy: 'admin' },
  { Id: 'enr-9', SubjectId: 'sub-3', StudentId: 'stu-7', Grade: 89, CreatedDate: new Date('2024-09-01'), CreatedBy: 'admin' },
  { Id: 'enr-10', SubjectId: 'sub-4', StudentId: 'stu-3', Grade: 84, CreatedDate: new Date('2024-09-01'), CreatedBy: 'admin' },
  { Id: 'enr-11', SubjectId: 'sub-4', StudentId: 'stu-8', Grade: 91, CreatedDate: new Date('2024-09-01'), CreatedBy: 'admin' },
];

interface MockAttendanceRecord {
  Date: string;
  SubjectId: string;
  PresentStudents: string[];
  AbsentStudents: string[];
}

const INITIAL_MAINTENANCES = {
  Nationality: [
    { Id: 1, Name: 'Dominican', Enabled: true, CreatedBy: 'admin', CreatedDate: new Date('2024-01-01'), LastUpdatedBy: null, LastUpdatedDate: null },
    { Id: 2, Name: 'American', Enabled: true, CreatedBy: 'admin', CreatedDate: new Date('2024-01-01'), LastUpdatedBy: null, LastUpdatedDate: null },
    { Id: 3, Name: 'Spanish', Enabled: true, CreatedBy: 'admin', CreatedDate: new Date('2024-01-01'), LastUpdatedBy: null, LastUpdatedDate: null },
    { Id: 4, Name: 'Mexican', Enabled: true, CreatedBy: 'admin', CreatedDate: new Date('2024-01-01'), LastUpdatedBy: null, LastUpdatedDate: null },
    { Id: 5, Name: 'Colombian', Enabled: true, CreatedBy: 'admin', CreatedDate: new Date('2024-01-01'), LastUpdatedBy: null, LastUpdatedDate: null },
  ],
  UserRole: [
    { Id: 1, Name: 'Admin', Enabled: true, CreatedBy: 'admin', CreatedDate: new Date('2024-01-01'), LastUpdatedBy: null, LastUpdatedDate: null },
    { Id: 2, Name: 'Professor', Enabled: true, CreatedBy: 'admin', CreatedDate: new Date('2024-01-01'), LastUpdatedBy: null, LastUpdatedDate: null },
    { Id: 3, Name: 'Student', Enabled: true, CreatedBy: 'admin', CreatedDate: new Date('2024-01-01'), LastUpdatedBy: null, LastUpdatedDate: null },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SUBJECTS)) {
      localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(INITIAL_SUBJECTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ENROLLMENTS)) {
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(INITIAL_ENROLLMENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ATTENDANCE)) {
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[0]));
    }
  }

  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || JSON.stringify(INITIAL_USERS));
  }
  private setUsers(users: User[]) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  private getStudents(): Student[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENTS) || JSON.stringify(INITIAL_STUDENTS));
  }
  private setStudents(students: Student[]) {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }

  private getSubjects(): Subject[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBJECTS) || JSON.stringify(INITIAL_SUBJECTS));
  }
  private setSubjects(subjects: Subject[]) {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  }

  private getEnrollments(): MockEnrollment[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ENROLLMENTS) || JSON.stringify(INITIAL_ENROLLMENTS));
  }
  private setEnrollments(enrollments: MockEnrollment[]) {
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrollments));
  }

  private getAttendance(): MockAttendanceRecord[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTENDANCE) || '[]');
  }
  private setAttendance(attendance: MockAttendanceRecord[]) {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
  }

  private getCurrentUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : INITIAL_USERS[0];
  }
  private setCurrentUser(user: User | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  private delay(ms: number = 100): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async handleRequest(method: string, endpoint: string, body?: any): Promise<any> {
    await this.delay(100);
    this.ensureInitialized();

    const normalizedUrl = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const [path, queryString] = normalizedUrl.split('?');
    const queryParams = new URLSearchParams(queryString || '');

    // ==========================================
    // 1. AUTH ENDPOINTS
    // ==========================================
    if (path === '/auth/login' && method === 'POST') {
      const { UserNameOrEmail } = body || {};
      const users = this.getUsers();
      const input = (UserNameOrEmail || '').toLowerCase().trim();

      let foundUser: User;
      if (input.includes('prof')) {
        foundUser = users.find(u => u.UserRoleId === 2) || users[1];
      } else {
        foundUser = users.find(u => u.UserRoleId === 1) || users[0];
      }

      const loggedInUser: User = {
        ...foundUser,
        LastAccessDate: new Date(),
        LastIpAccess: '127.0.0.1',
      };
      this.setCurrentUser(loggedInUser);

      return {
        isSuccess: true,
        message: 'Welcome back, ' + loggedInUser.FullName,
        title: 'Login Successful',
        data: {
          user: loggedInUser,
          token: 'mock-jwt-token-' + Date.now(),
        },
      };
    }

    if (path === '/auth/check_auth' && method === 'GET') {
      const user = this.getCurrentUser();
      return {
        isSuccess: true,
        data: {
          user: user || this.getUsers()[0],
          token: 'mock-jwt-token',
        },
      };
    }

    if (path === '/auth/logout' && method === 'POST') {
      this.setCurrentUser(null);
      return {
        isSuccess: true,
        message: 'Sesión cerrada exitosamente',
        title: 'Cierre de Sesión',
        data: null,
      };
    }

    if (path === '/auth/admin_reset_password' && method === 'POST') {
      return {
        isSuccess: true,
        message: 'Contraseña actualizada con éxito',
        title: 'Actualización Exitosa',
        data: true,
      };
    }

    // ==========================================
    // 2. MAINTENANCE ENDPOINTS
    // ==========================================
    if (path === '/get_all_selected_maintenances' && method === 'GET') {
      const requested = queryParams.get('selectedMaintenances')?.split(',') || ['Nationality', 'UserRole'];
      const result: any = {};
      if (requested.includes('Nationality') || requested.includes('NationalityId')) {
        result.Nationality = INITIAL_MAINTENANCES.Nationality;
      }
      if (requested.includes('UserRole') || requested.includes('UserRoleId')) {
        result.UserRole = INITIAL_MAINTENANCES.UserRole;
      }
      if (Object.keys(result).length === 0) {
        result.Nationality = INITIAL_MAINTENANCES.Nationality;
        result.UserRole = INITIAL_MAINTENANCES.UserRole;
      }
      return {
        isSuccess: true,
        data: result,
      };
    }

    // ==========================================
    // 3. STUDENT ENDPOINTS
    // ==========================================
    if (path === '/student_get_all' && method === 'GET') {
      const students = this.getStudents();
      const page = parseInt(queryParams.get('currentPage') || queryParams.get('page') || '1', 10);
      const pageSize = parseInt(queryParams.get('currentPageSize') || queryParams.get('pageSize') || '10', 10);
      const search = (queryParams.get('search') || '').toLowerCase().trim();

      const gender = queryParams.get('gender');
      const nationalityId = queryParams.get('nationalityId');
      const firstName = (queryParams.get('firstName') || '').toLowerCase();
      const lastName = (queryParams.get('lastName') || '').toLowerCase();
      const emailAddress = (queryParams.get('emailAddress') || '').toLowerCase();
      const phoneNumber = (queryParams.get('phoneNumber') || '').toLowerCase();
      const code = (queryParams.get('code') || '').toLowerCase();
      const parentName = (queryParams.get('parentName') || '').toLowerCase();

      let filtered = students.filter(s => {
        if (search) {
          const match =
            s.FullName.toLowerCase().includes(search) ||
            (s.Code && s.Code.toLowerCase().includes(search)) ||
            (s.EmailAddress && s.EmailAddress.toLowerCase().includes(search)) ||
            (s.PhoneNumber && s.PhoneNumber.toLowerCase().includes(search));
          if (!match) return false;
        }
        if (gender && s.Gender !== gender) return false;
        if (nationalityId && s.NationalityId !== Number(nationalityId)) return false;
        if (firstName && !s.FirstName.toLowerCase().includes(firstName)) return false;
        if (lastName && !s.LastName.toLowerCase().includes(lastName)) return false;
        if (emailAddress && !s.EmailAddress?.toLowerCase().includes(emailAddress)) return false;
        if (phoneNumber && !s.PhoneNumber?.toLowerCase().includes(phoneNumber)) return false;
        if (code && !s.Code?.toLowerCase().includes(code)) return false;
        if (parentName && !s.ParentName?.toLowerCase().includes(parentName)) return false;

        return true;
      });

      const total = filtered.length;
      const startIndex = (page - 1) * pageSize;
      const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

      return {
        isSuccess: true,
        data: paginatedData,
        total: total,
      };
    }

    if (path.startsWith('/student_by_id/') && method === 'GET') {
      const studentId = path.replace('/student_by_id/', '');
      const student = this.getStudents().find(s => s.Id === studentId);
      return {
        isSuccess: true,
        data: student || null,
      };
    }

    if (path === '/create_student' && method === 'POST') {
      const students = this.getStudents();
      const birthDate = new Date(body.DateOfBirth);
      const age = !isNaN(birthDate.getTime())
        ? new Date().getFullYear() - birthDate.getFullYear()
        : 20;

      const newStudent: Student = {
        Id: 'stu-' + Date.now(),
        Code: body.Code || `STU-2024-${String(students.length + 1).padStart(3, '0')}`,
        FirstName: body.FirstName,
        LastName: body.LastName,
        FullName: `${body.FirstName} ${body.LastName}`,
        DateOfBirth: body.DateOfBirth,
        Age: age,
        Gender: body.Gender || 'M',
        NationalityId: body.NationalityId ? Number(body.NationalityId) : 1,
        EmailAddress: body.EmailAddress || '',
        PhoneNumber: body.PhoneNumber || '',
        ParentName: body.ParentName || '',
        ParentPhoneNumber: body.ParentPhoneNumber || '',
        Address: body.Address || '',
        StatusId: 1,
        CreatedDate: new Date().toISOString(),
        CreatedBy: 'admin',
        Picture: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random() * 1000000)}?w=150`,
      };

      students.unshift(newStudent);
      this.setStudents(students);

      return {
        isSuccess: true,
        title: 'Estudiante Creado',
        message: 'El estudiante fue creado exitosamente',
        data: newStudent,
      };
    }

    if (path.startsWith('/update_student/') && method === 'PATCH') {
      const studentId = path.replace('/update_student/', '');
      const students = this.getStudents();
      const index = students.findIndex(s => s.Id === studentId);
      if (index !== -1) {
        const birthDate = new Date(body.DateOfBirth || students[index].DateOfBirth);
        const age = !isNaN(birthDate.getTime())
          ? new Date().getFullYear() - birthDate.getFullYear()
          : students[index].Age;

        students[index] = {
          ...students[index],
          ...body,
          Age: age,
          FullName: `${body.FirstName || students[index].FirstName} ${body.LastName || students[index].LastName}`,
          LastUpdatedDate: new Date().toISOString(),
          LastUpdatedBy: 'admin',
        };
        this.setStudents(students);
      }

      return {
        isSuccess: true,
        title: 'Estudiante Actualizado',
        message: 'El estudiante fue actualizado exitosamente',
        data: students[index] || null,
      };
    }

    if (path.startsWith('/delete_student/') && method === 'DELETE') {
      const studentId = path.replace('/delete_student/', '');
      let students = this.getStudents();
      students = students.filter(s => s.Id !== studentId);
      this.setStudents(students);

      return {
        isSuccess: true,
        title: 'Estudiante Eliminado',
        message: 'El estudiante fue eliminado exitosamente',
        data: null,
      };
    }

    // ==========================================
    // 4. SUBJECT ENDPOINTS
    // ==========================================
    if (path === '/subject_get_all' && method === 'GET') {
      const subjects = this.getSubjects();
      const page = parseInt(queryParams.get('currentPage') || queryParams.get('page') || '1', 10);
      const pageSize = parseInt(queryParams.get('currentPageSize') || queryParams.get('pageSize') || '10', 10);
      const search = (queryParams.get('search') || '').toLowerCase().trim();

      let filtered = subjects.filter(sub => {
        if (search) {
          return (
            sub.Name.toLowerCase().includes(search) ||
            (sub.Code && sub.Code.toLowerCase().includes(search)) ||
            (sub.Description && sub.Description.toLowerCase().includes(search))
          );
        }
        return true;
      });

      const total = filtered.length;
      const startIndex = (page - 1) * pageSize;
      const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

      return {
        isSuccess: true,
        data: paginatedData,
        total: total,
      };
    }

    if (path.startsWith('/get_subject/') && method === 'GET') {
      const subjectId = path.replace('/get_subject/', '');
      const subject = this.getSubjects().find(s => s.Id === subjectId);
      return {
        isSuccess: true,
        data: subject || null,
      };
    }

    if (path === '/create_subject' && method === 'POST') {
      const subjects = this.getSubjects();
      const newSubject: Subject = {
        Id: 'sub-' + Date.now(),
        Code: body.Code || `SUB-${String(subjects.length + 1).padStart(3, '0')}`,
        Name: body.Name,
        Description: body.Description || '',
        Enabled: body.Enabled !== undefined ? body.Enabled : true,
        StatusId: 1,
        StartDate: body.StartDate || new Date().toISOString().split('T')[0],
        EndDate: body.EndDate || new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
        ProfessorId: body.ProfessorId || 'usr-2',
        CreatedDate: new Date().toISOString(),
        CreatedBy: 'admin',
        LastUpdatedBy: null,
        LastUpdatedDate: null,
      };
      subjects.unshift(newSubject);
      this.setSubjects(subjects);

      return {
        isSuccess: true,
        title: 'Asignatura Creada',
        message: 'La asignatura fue creada exitosamente',
        data: newSubject,
      };
    }

    if (path.startsWith('/update_subject/') && method === 'PATCH') {
      const subjectId = path.replace('/update_subject/', '');
      const subjects = this.getSubjects();
      const index = subjects.findIndex(s => s.Id === subjectId);
      if (index !== -1) {
        subjects[index] = {
          ...subjects[index],
          ...body,
          LastUpdatedDate: new Date().toISOString(),
          LastUpdatedBy: 'admin',
        };
        this.setSubjects(subjects);
      }

      return {
        isSuccess: true,
        title: 'Asignatura Actualizada',
        message: 'La asignatura fue actualizada exitosamente',
        data: subjects[index] || null,
      };
    }

    if (path.startsWith('/delete_subject/') && method === 'DELETE') {
      const subjectId = path.replace('/delete_subject/', '');
      let subjects = this.getSubjects();
      subjects = subjects.filter(s => s.Id !== subjectId);
      this.setSubjects(subjects);

      return {
        isSuccess: true,
        title: 'Asignatura Eliminada',
        message: 'La asignatura fue eliminada exitosamente',
        data: null,
      };
    }

    // ==========================================
    // 5. SUBJECT ENROLLMENT & GRADES
    // ==========================================
    if (path.startsWith('/students_in_subject/') && method === 'GET') {
      const subjectId = path.replace('/students_in_subject/', '');
      const enrollments = this.getEnrollments().filter(e => e.SubjectId === subjectId);
      const students = this.getStudents();
      const enrolledStudents = enrollments
        .map(e => students.find(s => s.Id === e.StudentId))
        .filter((s): s is Student => Boolean(s));

      return {
        isSuccess: true,
        data: enrolledStudents,
      };
    }

    if (path.startsWith('/students_out_subject/') && method === 'GET') {
      const subjectId = path.replace('/students_out_subject/', '');
      const enrollments = this.getEnrollments().filter(e => e.SubjectId === subjectId);
      const enrolledStudentIds = new Set(enrollments.map(e => e.StudentId));
      const students = this.getStudents();
      const nonEnrolled = students.filter(s => !enrolledStudentIds.has(s.Id));

      return {
        isSuccess: true,
        data: nonEnrolled,
      };
    }

    if (path.startsWith('/students_in_subject_with_grades/') && method === 'GET') {
      const subjectId = path.replace('/students_in_subject_with_grades/', '');
      const enrollments = this.getEnrollments().filter(e => e.SubjectId === subjectId);
      const students = this.getStudents();

      const enrolledWithGrades: EnrolledStudentsWithGrades[] = [];
      for (const e of enrollments) {
        const student = students.find(s => s.Id === e.StudentId);
        if (student) {
          const letter = e.Grade !== null && e.Grade !== undefined ? calculateGrade(e.Grade) : 'N/A';
          enrolledWithGrades.push({
            Id: e.Id,
            SignatureId: e.SubjectId,
            StudentId: e.StudentId,
            CreatedDate: new Date(e.CreatedDate),
            CreatedBy: e.CreatedBy,
            Grade: e.Grade,
            LetterGrade: letter,
            Student: student,
          });
        }
      }

      return {
        isSuccess: true,
        data: enrolledWithGrades,
      };
    }

    if (path === '/save_subject_enrollment' && method === 'POST') {
      const { SubjectId, EnrollStudents, NotEnrollStudents } = body || {};
      let enrollments = this.getEnrollments();

      if (NotEnrollStudents && NotEnrollStudents.length > 0) {
        enrollments = enrollments.filter(
          e => !(e.SubjectId === SubjectId && NotEnrollStudents.includes(e.StudentId))
        );
      }

      if (EnrollStudents && EnrollStudents.length > 0) {
        EnrollStudents.forEach((studentId: string) => {
          const exists = enrollments.some(e => e.SubjectId === SubjectId && e.StudentId === studentId);
          if (!exists) {
            enrollments.push({
              Id: 'enr-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
              SubjectId: SubjectId,
              StudentId: studentId,
              Grade: null,
              CreatedDate: new Date(),
              CreatedBy: 'admin',
            });
          }
        });
      }

      this.setEnrollments(enrollments);

      return {
        isSuccess: true,
        title: 'Inscripciones Guardadas',
        message: 'Los cambios de inscripción fueron guardados con éxito',
        data: true,
      };
    }

    if (path === '/save_students_grades' && method === 'POST') {
      const { GradesMap } = body || {};
      const enrollments = this.getEnrollments();

      if (GradesMap && Array.isArray(GradesMap)) {
        GradesMap.forEach((item: { StudentSubjectCrossId: string; Grade: number }) => {
          const enr = enrollments.find(e => e.Id === item.StudentSubjectCrossId);
          if (enr) {
            enr.Grade = item.Grade;
          }
        });
        this.setEnrollments(enrollments);
      }

      return {
        isSuccess: true,
        title: 'Calificaciones Guardadas',
        message: 'Las calificaciones fueron guardadas con éxito',
        data: true,
      };
    }

    // ==========================================
    // 6. ATTENDANCE ENDPOINTS
    // ==========================================
    if (path.startsWith('/subject_get_attendance/') && method === 'GET') {
      const subjectId = path.replace('/subject_get_attendance/', '');
      const date = queryParams.get('date') || new Date().toISOString().split('T')[0];

      const allAttendance = this.getAttendance();
      const existingRecord = allAttendance.find(a => a.SubjectId === subjectId && a.Date === date);

      const enrollments = this.getEnrollments().filter(e => e.SubjectId === subjectId);
      const students = this.getStudents();
      const enrolledStudents = enrollments
        .map(e => students.find(s => s.Id === e.StudentId))
        .filter((s): s is Student => Boolean(s));

      let presentStudents: Student[] = [];
      let absentStudents: Student[] = [];

      if (existingRecord) {
        presentStudents = enrolledStudents.filter(s => existingRecord.PresentStudents.includes(s.Id));
        absentStudents = enrolledStudents.filter(s => existingRecord.AbsentStudents.includes(s.Id));
      } else {
        presentStudents = [...enrolledStudents];
        absentStudents = [];
      }

      return {
        isSuccess: true,
        data: {
          presentStudents,
          absentStudents,
        },
      };
    }

    if (path === '/save_subject_attendance' && method === 'POST') {
      const { Date: recordDate, SubjectId, PresentStudents, AbsentStudents } = body || {};
      const allAttendance = this.getAttendance().filter(
        a => !(a.SubjectId === SubjectId && a.Date === recordDate)
      );

      allAttendance.push({
        Date: recordDate,
        SubjectId: SubjectId,
        PresentStudents: PresentStudents || [],
        AbsentStudents: AbsentStudents || [],
      });

      this.setAttendance(allAttendance);

      return {
        isSuccess: true,
        title: 'Asistencia Guardada',
        message: 'El registro de asistencia fue guardado exitosamente',
        data: true,
      };
    }

    // ==========================================
    // 7. USER ENDPOINTS
    // ==========================================
    if (path === '/get_users' && method === 'GET') {
      const users = this.getUsers();
      const page = parseInt(queryParams.get('currentPage') || queryParams.get('page') || '1', 10);
      const pageSize = parseInt(queryParams.get('currentPageSize') || queryParams.get('pageSize') || '10', 10);
      const search = (queryParams.get('search') || '').toLowerCase().trim();

      let filtered = users.filter(u => {
        if (search) {
          return (
            u.FullName.toLowerCase().includes(search) ||
            u.UserName.toLowerCase().includes(search) ||
            u.Email.toLowerCase().includes(search) ||
            (u.Phone && u.Phone.toLowerCase().includes(search))
          );
        }
        return true;
      });

      const total = filtered.length;
      const startIndex = (page - 1) * pageSize;
      const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

      return {
        isSuccess: true,
        data: paginatedData,
        total: total,
      };
    }

    if (path === '/get_professors' && method === 'GET') {
      const professors = this.getUsers().filter(u => u.UserRoleId === 2);
      return {
        isSuccess: true,
        data: professors,
      };
    }

    if (path.startsWith('/get_user/') && method === 'GET') {
      const userId = path.replace('/get_user/', '');
      const user = this.getUsers().find(u => u.Id === userId);
      return {
        isSuccess: true,
        data: user || null,
      };
    }

    if (path === '/create_user' && method === 'POST') {
      const users = this.getUsers();
      const roleName = body.UserRoleId === 1 ? 'Admin' : body.UserRoleId === 2 ? 'Professor' : 'Student';
      const newUser: User = {
        Id: 'usr-' + Date.now(),
        FirstName: body.FirstName,
        LastName: body.LastName,
        UserName: body.UserName,
        FullName: `${body.FirstName} ${body.LastName}`,
        Gender: body.Gender || 'M',
        Email: body.Email,
        Phone: body.Phone || '',
        UserRoleId: Number(body.UserRoleId) || 2,
        UserRole: { Name: roleName },
        Authorized: body.Authorized !== undefined ? Boolean(body.Authorized) : true,
        Locked: false,
        LockedDate: null,
        Deleted: false,
        DeletedDate: null,
        ChangePwdNextLogin: body.ChangePwdNextLogin || false,
        LastPwdChangedDate: new Date(),
        CreatedBy: 'admin',
        CreatedDate: new Date(),
        LastUpdatedBy: null,
        LastUpdatedDate: null,
        LastIpAccess: '127.0.0.1',
        LastAccessDate: new Date(),
        Picture: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?w=150`,
      };

      users.unshift(newUser);
      this.setUsers(users);

      return {
        isSuccess: true,
        title: 'Usuario Creado',
        message: 'El usuario fue creado exitosamente',
        data: newUser,
      };
    }

    if (path === '/update_user' && method === 'PATCH') {
      const users = this.getUsers();
      const userId = body.UserId;
      const index = users.findIndex(u => u.Id === userId);
      if (index !== -1) {
        const roleName = body.UserRoleId === 1 ? 'Admin' : body.UserRoleId === 2 ? 'Professor' : 'Student';
        users[index] = {
          ...users[index],
          ...body,
          FullName: `${body.FirstName || users[index].FirstName} ${body.LastName || users[index].LastName}`,
          UserRoleId: body.UserRoleId ? Number(body.UserRoleId) : users[index].UserRoleId,
          UserRole: { Name: roleName },
          LastUpdatedDate: new Date(),
          LastUpdatedBy: 'admin',
        };
        this.setUsers(users);
      }

      return {
        isSuccess: true,
        title: 'Usuario Actualizado',
        message: 'El usuario fue actualizado exitosamente',
        data: users[index] || null,
      };
    }

    return {
      isSuccess: true,
      data: null,
      message: 'Operación ejecutada con éxito',
    };
  }
}
