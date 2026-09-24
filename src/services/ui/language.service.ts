import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'es';

export interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}

const TRANSLATIONS: Translations = {
  // Navigation & Topbar
  navHome: { en: 'Home', es: 'Inicio' },
  navSubjects: { en: 'Subjects', es: 'Asignaturas' },
  navStudents: { en: 'Students', es: 'Estudiantes' },
  navUsers: { en: 'Users', es: 'Usuarios' },
  navProfessorDashboard: { en: 'Professor Portal', es: 'Portal Docente' },
  logout: { en: 'Logout', es: 'Cerrar Sesión' },
  loggedInAs: { en: 'Logged in as', es: 'Conectado como' },
  switchLanguage: { en: 'Switch to Spanish', es: 'Cambiar a Inglés' },

  // Login Page
  loginTitle: { en: 'Sign In to EduTrack', es: 'Iniciar Sesión en EduTrack' },
  loginSubtitle: { en: 'Academic Management Platform', es: 'Plataforma de Gestión Académica' },
  usernameOrEmail: { en: 'Username or Email', es: 'Usuario o Correo Electrónico' },
  password: { en: 'Password', es: 'Contraseña' },
  rememberMe: { en: 'Remember me', es: 'Recordarme' },
  forgotPassword: { en: 'Forgot password?', es: '¿Olvidaste tu contraseña?' },
  signIn: { en: 'Sign In', es: 'Iniciar Sesión' },
  loginPrompt: { en: 'Enter "admin" for Administrator, or "professor" for Faculty', es: 'Escribe "admin" para Administrador o "professor" para Docente' },

  // Dashboard Banner & Metrics
  welcome: { en: 'Welcome back', es: 'Bienvenido' },
  bannerSubtitle: {
    en: 'EduTrack Academic Management System. Track and manage metrics, subjects, students, and grades in real-time.',
    es: 'Sistema de gestión académica EduTrack. Consulta tus métricas, asignaturas, estudiantes y calificaciones en tiempo real.'
  },
  viewSubjects: { en: 'View Subjects', es: 'Ver Asignaturas' },
  viewStudents: { en: 'View Students', es: 'Ver Estudiantes' },
  totalStudents: { en: 'Total Students', es: 'Total Estudiantes' },
  activeInSystem: { en: 'Active in system', es: 'Activos en el sistema' },
  totalSubjects: { en: 'Active Subjects', es: 'Asignaturas Activas' },
  currentTerm: { en: 'Fall Term 2024', es: 'Ciclo Académico 2024-2' },
  professors: { en: 'Faculty Professors', es: 'Docentes Asignados' },
  avgPassingRate: { en: 'Avg Passing Rate', es: 'Tasa de Aprobación' },
  attendanceRate: { en: 'Attendance Rate', es: 'Tasa de Asistencia' },

  // Sections & Analytics
  recentSubjects: { en: 'Recent Subjects', es: 'Asignaturas Recientes' },
  recentSubjectsSub: { en: 'Active courses in the current academic period', es: 'Cursos disponibles en el ciclo actual' },
  viewAll: { en: 'View all', es: 'Ver todos' },
  registeredStudents: { en: 'Registered Students', es: 'Estudiantes Registrados' },
  registeredStudentsSub: { en: 'Recently enrolled students in the platform', es: 'Últimos estudiantes dados de alta' },
  gradeDistribution: { en: 'Grade Performance Overview', es: 'Rendimiento de Calificaciones' },
  gradeDistributionSub: { en: 'Student distribution across academic tiers', es: 'Distribución de alumnos por nivel académico' },
  quickActions: { en: 'Quick Actions', es: 'Acciones Rápidas' },
  quickActionsSub: { en: 'Shortcut administrative tools', es: 'Herramientas y accesos rápidos' },
  exportData: { en: 'Export CSV', es: 'Exportar CSV' },
  newStudent: { en: 'New Student', es: 'Nuevo Estudiante' },
  newSubject: { en: 'New Subject', es: 'Nueva Asignatura' },
  newUser: { en: 'New User', es: 'Nuevo Usuario' },
  viewProfile: { en: 'View Academic Profile', es: 'Ver Perfil Académico' },

  // Common Table & Form Controls
  search: { en: 'Search', es: 'Buscar' },
  clear: { en: 'Clear', es: 'Limpiar' },
  filters: { en: 'Filters', es: 'Filtros' },
  actions: { en: 'Actions', es: 'Acciones' },
  save: { en: 'Save', es: 'Guardar' },
  cancel: { en: 'Cancel', es: 'Cancelar' },
  delete: { en: 'Delete', es: 'Eliminar' },
  edit: { en: 'Edit', es: 'Editar' },
  close: { en: 'Close', es: 'Cerrar' },
  reset: { en: 'Reset', es: 'Restablecer' },
  applyFilters: { en: 'Apply Filters', es: 'Aplicar Filtros' },
  resetFilters: { en: 'Reset Filters', es: 'Restablecer Filtros' },
  confirm: { en: 'Confirm', es: 'Confirmar' },
  areYouSure: { en: 'Are you sure you want to delete', es: '¿Estás seguro de que deseas eliminar' },
  photo: { en: 'Photo', es: 'Foto' },
  picture: { en: 'Picture', es: 'Foto' },
  showing: { en: 'Showing', es: 'Mostrando' },
  to: { en: 'to', es: 'a' },
  of: { en: 'of', es: 'de' },

  // Student Fields & Management
  studentManagement: { en: 'Student Management', es: 'Gestión de Estudiantes' },
  studentManagementSub: { en: 'Manage and organize student records', es: 'Administra y organiza los registros de estudiantes' },
  studentFilter: { en: 'Student Filter', es: 'Filtros de Estudiantes' },
  refineStudentList: { en: 'Refine and filter your student list', es: 'Filtra y personaliza tu lista de estudiantes' },
  searchStudents: { en: 'Search students...', es: 'Buscar estudiantes...' },
  firstName: { en: 'First Name', es: 'Nombre' },
  lastName: { en: 'Last Name', es: 'Apellido' },
  fullName: { en: 'Full Name', es: 'Nombre Completo' },
  code: { en: 'Code', es: 'Matrícula / Código' },
  age: { en: 'Age', es: 'Edad' },
  gender: { en: 'Gender', es: 'Género' },
  male: { en: 'Male', es: 'Masculino' },
  female: { en: 'Female', es: 'Femenino' },
  other: { en: 'Other', es: 'Otro' },
  email: { en: 'Email Address', es: 'Correo Electrónico' },
  phone: { en: 'Phone Number', es: 'Teléfono' },
  nationality: { en: 'Nationality', es: 'Nacionalidad' },
  selectNationality: { en: 'Select Nationality', es: 'Seleccionar Nacionalidad' },
  selectGender: { en: 'Select Gender', es: 'Seleccionar Género' },
  dateOfBirth: { en: 'Date of Birth', es: 'Fecha de Nacimiento' },
  address: { en: 'Address', es: 'Dirección' },
  parentName: { en: 'Parent / Guardian Name', es: 'Nombre del Tutor / Padre' },
  parentPhone: { en: 'Parent Phone Number', es: 'Teléfono del Tutor / Padre' },
  created: { en: 'Created', es: 'Creado' },
  lastUpdated: { en: 'Last Updated', es: 'Última Actualización' },
  studentDetails: { en: 'Student Details', es: 'Detalles del Estudiante' },
  firstNameRequired: { en: 'First Name is required', es: 'El nombre es obligatorio' },
  lastNameRequired: { en: 'Last Name is required', es: 'El apellido es obligatorio' },
  dobRequired: { en: 'Date of Birth is required', es: 'La fecha de nacimiento es obligatoria' },

  // Subject Fields & Management
  subjectManagement: { en: 'Subject Management', es: 'Gestión de Asignaturas' },
  subjectManagementSub: { en: 'Manage and organize academic courses and syllabi', es: 'Administra y organiza las asignaturas y programas de estudio' },
  subjectsList: { en: 'Subjects List', es: 'Lista de Asignaturas' },
  searchSubjects: { en: 'Search subjects...', es: 'Buscar asignaturas...' },
  subjectName: { en: 'Subject Name', es: 'Nombre de la Asignatura' },
  name: { en: 'Name', es: 'Nombre' },
  description: { en: 'Description', es: 'Descripción' },
  startDate: { en: 'Start Date', es: 'Fecha de Inicio' },
  endDate: { en: 'End Date', es: 'Fecha de Fin' },
  professor: { en: 'Professor', es: 'Profesor / Docente' },
  selectProfessor: { en: 'Select a Professor', es: 'Seleccionar un Docente' },
  subjectDetails: { en: 'Subject Details', es: 'Detalles de la Asignatura' },
  status: { en: 'Status', es: 'Estado' },
  enabled: { en: 'Enabled', es: 'Habilitada' },
  active: { en: 'Active', es: 'Activa' },
  inactive: { en: 'Inactive', es: 'Inactiva' },
  activeSubject: { en: 'Active Subject', es: 'Asignatura Activa' },
  inactiveSubject: { en: 'Inactive Subject', es: 'Asignatura Inactiva' },
  nameRequired: { en: 'Subject name is required', es: 'El nombre de la asignatura es obligatorio' },
  startDateRequired: { en: 'Start date is required', es: 'La fecha de inicio es obligatoria' },
  endDateRequired: { en: 'End date is required', es: 'La fecha de fin es obligatoria' },
  studentsAttendance: { en: 'Students Attendance', es: 'Asistencia de Estudiantes' },
  studentsGrades: { en: 'Students Grades', es: 'Calificaciones de Estudiantes' },
  enrollStudents: { en: 'Enroll Students', es: 'Inscribir Estudiantes' },
  editSubject: { en: 'Edit Subject', es: 'Editar Asignatura' },
  deleteSubject: { en: 'Delete Subject', es: 'Eliminar Asignatura' },

  // PickList / Enrollment & Attendance & Grades
  subjectEnrollment: { en: 'Subject Enrollment Roster', es: 'Inscripción de Estudiantes' },
  availableStudents: { en: 'Available Students', es: 'Estudiantes Disponibles' },
  currentlyEnrolled: { en: 'Currently Enrolled', es: 'Estudiantes Inscritos' },
  searchAvailableStudents: { en: 'Search available students...', es: 'Buscar estudiantes disponibles...' },
  searchEnrolledStudents: { en: 'Search enrolled students...', es: 'Buscar estudiantes inscritos...' },
  saveChanges: { en: 'Save Changes', es: 'Guardar Cambios' },
  subjectAttendance: { en: 'Daily Attendance Tracker', es: 'Control Diario de Asistencia' },
  attendanceDate: { en: 'Attendance Date', es: 'Fecha de Asistencia' },
  presentStudents: { en: 'Present Students', es: 'Estudiantes Presentes' },
  absentStudents: { en: 'Absent Students', es: 'Estudiantes Ausentes' },
  searchPresentStudents: { en: 'Search present students...', es: 'Buscar estudiantes presentes...' },
  searchAbsentStudents: { en: 'Search absent students...', es: 'Buscar estudiantes ausentes...' },
  updateGradesFor: { en: 'Update Grades for', es: 'Calificaciones de' },
  updateGradesSub: { en: 'Manage and update student evaluation grades', es: 'Administra y actualiza las notas de evaluación de los estudiantes' },
  editGrades: { en: 'Edit Grades', es: 'Editar Calificaciones' },
  saveGrades: { en: 'Save Changes', es: 'Guardar Cambios' },
  student: { en: 'Student', es: 'Estudiante' },
  grade: { en: 'Numeric Grade', es: 'Calificación Numérica' },
  letterGrade: { en: 'Letter Grade', es: 'Literal' },

  // User Management
  userManagement: { en: 'User Management', es: 'Gestión de Usuarios' },
  userManagementSub: { en: 'Manage system users and access permissions', es: 'Administra los usuarios del sistema y sus niveles de acceso' },
  usersList: { en: 'Users List', es: 'Lista de Usuarios' },
  searchUsers: { en: 'Search users...', es: 'Buscar usuarios...' },
  username: { en: 'Username', es: 'Nombre de Usuario' },
  userRole: { en: 'User Role', es: 'Rol de Usuario' },
  selectUserRole: { en: 'Select a User Role', es: 'Seleccionar Rol de Usuario' },
  authorized: { en: 'Authorized', es: 'Autorizado' },
  notAuthorized: { en: 'Not Authorized', es: 'No Autorizado' },
  lastAccess: { en: 'Last Access', es: 'Último Acceso' },
  passwordChanged: { en: 'Password Changed', es: 'Contraseña Modificada' },
  userDetails: { en: 'User Details', es: 'Detalles del Usuario' },
  editUser: { en: 'Edit User', es: 'Editar Usuario' },
  resetPassword: { en: 'Reset Password', es: 'Restablecer Contraseña' },
  automaticPassword: { en: 'Automatic Password', es: 'Contraseña Automática' },
  changePwdNextLogin: { en: 'Change Password Next Login', es: 'Cambiar Contraseña en Próximo Inicio' },
  confirmPassword: { en: 'Confirm Password', es: 'Confirmar Contraseña' },
  usernameRequired: { en: 'Username is required', es: 'El nombre de usuario es obligatorio' },
  emailRequired: { en: 'Email address is required', es: 'El correo electrónico es obligatorio' },
  roleRequired: { en: 'User role is required', es: 'El rol de usuario es obligatorio' },
  passwordRequired: { en: 'Password is required', es: 'La contraseña es obligatoria' },
  confirmPasswordRequired: { en: 'Confirm password is required', es: 'Confirmar la contraseña es obligatorio' },

  // Professor Portal
  professorPortal: { en: 'Faculty / Professor Portal', es: 'Portal Docente' },
  professorCourses: { en: 'My Assigned Courses', es: 'Mis Cursos Asignados' },
  professorCoursesSub: {
    en: 'Manage your assigned classes, register daily attendance, and record exam evaluations.',
    es: 'Administra tus clases asignadas, registra la asistencia diaria y evalúa los exámenes.'
  },
  allSubjects: { en: 'All Subjects', es: 'Todas las Asignaturas' },
  myAssignedCourses: { en: 'My Assigned Courses', es: 'Mis Cursos Asignados' },
  takeAttendance: { en: 'Attendance', es: 'Asistencia' },
  gradebook: { en: 'Grades', es: 'Calificaciones' },
  enrollmentRoster: { en: 'Students', es: 'Estudiantes' },
  yearsOld: { en: 'years old', es: 'años' },
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public currentLang = signal<Language>('en');

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('edutrack_lang') as Language;
      if (saved === 'en' || saved === 'es') {
        this.currentLang.set(saved);
      }
    }
  }

  public setLanguage(lang: Language) {
    this.currentLang.set(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('edutrack_lang', lang);
    }
  }

  public toggleLanguage() {
    const next: Language = this.currentLang() === 'en' ? 'es' : 'en';
    this.setLanguage(next);
  }

  public t(key: string): string {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[this.currentLang()] || key;
  }
}
