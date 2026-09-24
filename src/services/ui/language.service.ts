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
  loginPrompt: { en: 'Enter "admin" (Admin), "professor" (Faculty), or "student" (Student)', es: 'Escribe "admin" (Admin), "professor" (Docente) o "student" (Estudiante)' },

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
  view360Profile: { en: '360° Profile', es: 'Perfil 360°' },
  student360Profile: { en: 'Student 360° Profile & Academic File', es: 'Perfil Integral 360° del Estudiante' },
  navStudentPortal: { en: 'Student Portal', es: 'Portal Estudiantil' },
  navAttendance: { en: 'Attendance Tracker', es: 'Control de Asistencia' },
  studentPortalSub: { en: 'Track your enrolled courses, grades, schedule, and attendance in real time', es: 'Consulta tus asignaturas, notas, horario y asistencia en tiempo real' },
  academicRecord: { en: 'Academic Record', es: 'Expediente Académico' },
  enrolledCourses: { en: 'Enrolled Courses', es: 'Asignaturas Inscritas' },
  attendanceLog: { en: 'Attendance & Punctuality', es: 'Asistencia y Puntualidad' },
  digitalIdCard: { en: 'Digital Student ID', es: 'Carnet Estudiantil Digital' },
  upcomingDeadlines: { en: 'Assignments & Deadlines', es: 'Tareas y Evaluaciones' },
  emergencyContact: { en: 'Emergency Contact', es: 'Contacto de Emergencia' },
  downloadIdCard: { en: 'Print Student ID', es: 'Imprimir Carnet' },
  markAllPresent: { en: 'Mark All Present', es: 'Marcar Todos Presentes' },
  saveAttendance: { en: 'Save Attendance', es: 'Guardar Asistencia' },
  attendanceRateShort: { en: 'Attendance Rate', es: 'Tasa de Asistencia' },
  present: { en: 'Present', es: 'Presente' },
  absent: { en: 'Absent', es: 'Ausente' },
  late: { en: 'Late', es: 'Tardanza' },
  excused: { en: 'Excused', es: 'Justificado' },
  careerProgress: { en: 'Career Progress', es: 'Progreso de Carrera' },
  completedCredits: { en: 'Completed Credits', es: 'Créditos Aprobados' },
  studentStatusActive: { en: 'Regular Student', es: 'Estudiante Regular' },
  studentStatusHonor: { en: 'Dean\'s Honor Roll', es: 'Beca de Honor' },
  bloodType: { en: 'Blood Type', es: 'Tipo de Sangre' },
  enrollmentDate: { en: 'Enrollment Date', es: 'Fecha de Ingreso' },
  validThru: { en: 'Valid Thru', es: 'Válido Hasta' },
  selectSubjectToTakeAttendance: { en: 'Select a subject to record attendance', es: 'Selecciona una asignatura para pasar lista' },
  attendanceSavedSuccess: { en: 'Attendance saved successfully!', es: '¡Asistencia guardada con éxito!' },

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
  professor: { en: 'Professor', es: 'Profesor' },
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
  yearsOld: { en: 'years old', es: 'años' },
  yearsOldShort: { en: 'yrs', es: 'años' },
  unassigned: { en: 'Unassigned', es: 'Sin asignar' },
  administrator: { en: 'Administrator', es: 'Administrador' },
  faculty: { en: 'Faculty / Professor', es: 'Docente' },
  dominican: { en: 'Dominican', es: 'Dominicano/a' },
  american: { en: 'American', es: 'Estadounidense' },
  spanish: { en: 'Spanish', es: 'Español/a' },
  mexican: { en: 'Mexican', es: 'Mexicano/a' },
  colombian: { en: 'Colombian', es: 'Colombiano/a' },

  // Feature 1: Report Card & Official Transcript
  reportCard: { en: 'Report Card', es: 'Boletín de Notas' },
  officialReportCard: { en: 'Official Academic Transcript', es: 'Boletín Oficial de Calificaciones' },
  academicTranscript: { en: 'Academic Record', es: 'Historial Académico' },
  academicStanding: { en: 'Academic Standing', es: 'Estado Académico' },
  honorRoll: { en: 'Honor Roll (Summa Cum Laude)', es: 'Cuadro de Honor (Sobresaliente)' },
  inGoodStanding: { en: 'Good Standing', es: 'Condición Regular (Aprobado)' },
  academicProbation: { en: 'Academic Warning', es: 'En Riesgo / Condicional' },
  cumulativeGPA: { en: 'Cumulative GPA', es: 'Promedio Acumulado' },
  creditsEarned: { en: 'Total Credits', es: 'Créditos Aprobados' },
  printTranscript: { en: 'Print / Save PDF', es: 'Imprimir / Guardar PDF' },
  institutionName: { en: 'EduTrack International Academy', es: 'Academia Internacional EduTrack' },
  issuedDate: { en: 'Issued on', es: 'Emitido el' },
  gradingScale: { en: 'Grading Scale: A (90-100), B (80-89), C (70-79), F (<70)', es: 'Escala: A (90-100), B (80-89), C (70-79), F (<70)' },
  courseCode: { en: 'Code', es: 'Código' },
  courseName: { en: 'Course / Subject', es: 'Asignatura' },
  finalGrade: { en: 'Final Grade', es: 'Calificación Final' },
  deanSignature: { en: 'Dean of Academic Affairs', es: 'Director de Asuntos Académicos' },
  registrarSignature: { en: 'Registrar Office', es: 'Oficina de Registro' },

  // Feature 2: Weekly Schedule / Timetable
  navSchedule: { en: 'Class Schedule', es: 'Horario de Clases' },
  classSchedule: { en: 'Weekly Class Schedule', es: 'Horario Semanal de Clases' },
  weeklySchedule: { en: 'Academic Timetable', es: 'Calendario Académico' },
  weeklyScheduleSub: { en: 'Interactive weekly course calendar and room assignments', es: 'Calendario semanal interactivo y asignación de aulas' },
  myScheduleOnly: { en: 'My Teaching Schedule', es: 'Mi Horario Docente Asignado' },
  adminViewSchedule: { en: 'Institution Master Timetable', es: 'Horario Institucional Completo' },
  filterByProfessor: { en: 'Filter by Professor', es: 'Filtrar por Profesor' },
  allProfessors: { en: 'All Faculty Professors', es: 'Todos los Profesores' },
  monday: { en: 'Monday', es: 'Lunes' },
  tuesday: { en: 'Tuesday', es: 'Martes' },
  wednesday: { en: 'Wednesday', es: 'Miércoles' },
  thursday: { en: 'Thursday', es: 'Jueves' },
  friday: { en: 'Friday', es: 'Viernes' },
  allDays: { en: 'All Days', es: 'Todos los Días' },
  classroom: { en: 'Classroom / Lab', es: 'Aula / Laboratorio' },
  instructor: { en: 'Instructor', es: 'Profesor' },
  timeSlot: { en: 'Time', es: 'Horario' },
  selectDay: { en: 'Select Day', es: 'Seleccionar Día' },
  scheduleType: { en: 'Course Type', es: 'Tipo de Clase' },

  // Feature 4: Notifications & Live Activity Center
  notifications: { en: 'Notifications', es: 'Notificaciones' },
  noNotifications: { en: 'No new notifications', es: 'No hay notificaciones nuevas' },
  markAllAsRead: { en: 'Mark all as read', es: 'Marcar todas como leídas' },
  recentActivity: { en: 'Recent System Activity', es: 'Actividad Reciente del Sistema' },
  notificationGradeTitle: { en: 'Grades Updated', es: 'Calificaciones Actualizadas' },
  notificationGradeMsg: { en: 'Prof. Gomez updated evaluation grades for Calculus I', es: 'El Prof. Gómez actualizó las evaluaciones de Cálculo Diferencial' },
  notificationEnrollTitle: { en: 'New Student Enrolled', es: 'Nuevo Estudiante Matriculado' },
  notificationEnrollMsg: { en: 'Student enrolled in Data Structures & Algorithms', es: 'Estudiante matriculado en Estructuras de Datos' },
  notificationAttendanceTitle: { en: 'Daily Attendance Recorded', es: 'Asistencia Registrada' },
  notificationAttendanceMsg: { en: 'Attendance submitted for Classical Mechanics (92% Present)', es: 'Asistencia completada para Física Mecánica (92% presentes)' },
  notificationSubjectTitle: { en: 'New Subject Scheduled', es: 'Nueva Asignatura Programada' },
  notificationSubjectMsg: { en: 'Relational Database Systems added to the curriculum', es: 'Bases de Datos Relacionales programada en el ciclo' },
  justNow: { en: 'Just now', es: 'Hace un momento' },
  twoHoursAgo: { en: '2 hours ago', es: 'Hace 2 horas' },
  hoursAgo: { en: '2 hours ago', es: 'Hace 2 horas' },
  yesterday: { en: 'Yesterday', es: 'Ayer' },
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

  public getGenderLabel(gender: string | null | undefined): string {
    if (!gender) return '';
    const g = gender.toUpperCase();
    if (g === 'M' || g === 'MALE' || g === 'MASCULINO') return this.t('male');
    if (g === 'F' || g === 'FEMALE' || g === 'FEMENINO') return this.t('female');
    return this.t('other');
  }

  public getNationalityLabel(id: number | null | undefined, fallback?: string): string {
    if (id === 1) return this.t('dominican');
    if (id === 2) return this.t('american');
    if (id === 3) return this.t('spanish');
    if (id === 4) return this.t('mexican');
    if (id === 5) return this.t('colombian');
    if (fallback) return fallback;
    return this.t('dominican');
  }

  public getRoleLabel(role: any): string {
    if (typeof role === 'number') {
      return role === 1 ? this.t('administrator') : this.t('professor');
    }
    if (typeof role === 'string') {
      if (role.toLowerCase().includes('admin')) return this.t('administrator');
      if (role.toLowerCase().includes('prof')) return this.t('professor');
    }
    if (role && typeof role === 'object' && role.Name) {
      if (role.Name.toLowerCase().includes('admin')) return this.t('administrator');
      if (role.Name.toLowerCase().includes('prof')) return this.t('professor');
      return role.Name;
    }
    return this.t('administrator');
  }
}
