import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { LanguageService } from '../../../../services/ui/language.service';
import { Student } from '../../../../types/student';
import { StudentPaymentDialogComponent, InvoiceItem } from '../student-payment-dialog/student-payment-dialog.component';

export interface EnrolledCourseDetail {
  code: string;
  name: string;
  credits: number;
  professor: string;
  professorAvatar: string;
  schedule: string;
  room: string;
  p1: number;
  p2: number;
  final: number;
  average: number;
  letter: 'A' | 'B' | 'C' | 'F';
  status: 'approved' | 'in_progress' | 'failed';
}

export interface UpcomingAssignment {
  id: string;
  subjectCode: string;
  title: string;
  dueDate: string;
  type: 'Exam' | 'Project' | 'Homework' | 'Quiz';
  weight: number;
  status: 'submitted' | 'pending' | 'graded';
  score?: number;
}

@Component({
  selector: 'app-student-profile-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    TabViewModule,
    TableModule,
    TagModule,
    BadgeModule,
    AvatarModule,
    ProgressBarModule,
    TooltipModule,
    StudentPaymentDialogComponent
  ],
  templateUrl: './student-profile-dialog.component.html',
  styleUrls: ['./student-profile-dialog.component.css']
})
export class StudentProfileDialogComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() student: Student | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() openReportCard = new EventEmitter<Student>();

  activeTabIndex: number = 0;

  paymentDialogVisible: boolean = false;
  selectedInvoiceForPayment: InvoiceItem | null = null;

  invoices: InvoiceItem[] = [
    {
      id: 'inv-101',
      conceptKey: 'tuitionInstallment1',
      conceptFallback: 'Cuota de Matrícula 1 (Inscripción)',
      dueDate: '2024-08-30',
      amount: 18500.00,
      status: 'paid',
      paidDate: '2024-08-28',
      receiptNumber: 'REC-2024-81923',
      paymentMethod: 'Tarjeta Visa •••• 8842'
    },
    {
      id: 'inv-102',
      conceptKey: 'labFee',
      conceptFallback: 'Cuota de Laboratorios & Tecnología',
      dueDate: '2024-09-15',
      amount: 4200.00,
      status: 'paid',
      paidDate: '2024-09-12',
      receiptNumber: 'REC-2024-83912',
      paymentMethod: 'Tarjeta Mastercard •••• 1042'
    },
    {
      id: 'inv-103',
      conceptKey: 'tuitionInstallment2',
      conceptFallback: 'Cuota de Matrícula 2 (Medio Término)',
      dueDate: '2024-10-30',
      amount: 18500.00,
      status: 'pending'
    },
    {
      id: 'inv-104',
      conceptKey: 'tuitionInstallment3',
      conceptFallback: 'Cuota de Matrícula 3 (Cierre de Ciclo)',
      dueDate: '2024-11-30',
      amount: 18500.00,
      status: 'pending'
    },
    {
      id: 'inv-105',
      conceptKey: 'studentCardFee',
      conceptFallback: 'Servicios Estudiantiles & Carnet',
      dueDate: '2024-08-30',
      amount: 1500.00,
      status: 'paid',
      paidDate: '2024-08-28',
      receiptNumber: 'REC-2024-81924',
      paymentMethod: 'Tarjeta Visa •••• 8842'
    }
  ];

  // Enrolled Courses Data
  courses: EnrolledCourseDetail[] = [
    {
      code: 'MAT-101',
      name: 'Cálculo Diferencial',
      credits: 4,
      professor: 'Carlos Santana',
      professorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      schedule: 'Lun / Mié 08:00 - 10:00',
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
      schedule: 'Lun / Jue 10:30 - 12:30',
      room: 'Lab Comp 3',
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
      schedule: 'Mar 09:00 - 11:00',
      room: 'Lab Física',
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
      schedule: 'Mar / Vie 02:00 - 04:00',
      room: 'Data Center 102',
      p1: 95,
      p2: 98,
      final: 94,
      average: 95.6,
      letter: 'A',
      status: 'approved'
    }
  ];

  // Attendance metrics
  attendanceMetrics = {
    overallRate: 96.5,
    presentDays: 58,
    lateDays: 2,
    absentDays: 0,
    excusedDays: 1,
    totalSessions: 61
  };

  // Upcoming Assignments / Exams
  assignments: UpcomingAssignment[] = [
    {
      id: 'asg-1',
      subjectCode: 'INF-201',
      title: 'Implementación de Árboles AVL y Grafos',
      dueDate: '2024-10-15',
      type: 'Project',
      weight: 25,
      status: 'submitted',
      score: 95
    },
    {
      id: 'asg-2',
      subjectCode: 'MAT-101',
      title: 'Examen Parcial II: Integración por Partes',
      dueDate: '2024-10-20',
      type: 'Exam',
      weight: 30,
      status: 'pending'
    },
    {
      id: 'asg-3',
      subjectCode: 'DB-301',
      title: 'Modelo Relacional & Normalización 3NF',
      dueDate: '2024-10-24',
      type: 'Homework',
      weight: 15,
      status: 'pending'
    },
    {
      id: 'asg-4',
      subjectCode: 'FIS-102',
      title: 'Informe de Laboratorio: Péndulo Simple',
      dueDate: '2024-10-28',
      type: 'Quiz',
      weight: 10,
      status: 'pending'
    }
  ];

  constructor(public languageService: LanguageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.activeTabIndex = 0;
    }
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  get cumulativeGpa(): string {
    const totalAvg = this.courses.reduce((acc, c) => acc + c.average, 0) / (this.courses.length || 1);
    return ((totalAvg / 100) * 4.0).toFixed(2);
  }

  get totalCredits(): number {
    return this.courses.reduce((acc, c) => acc + c.credits, 0);
  }

  get outstandingBalance(): number {
    return this.invoices
      .filter(i => i.status === 'pending')
      .reduce((sum, i) => sum + i.amount, 0);
  }

  get totalPaidAmount(): number {
    return this.invoices
      .filter(i => i.status === 'paid')
      .reduce((sum, i) => sum + i.amount, 0);
  }

  get nextPendingInvoice(): InvoiceItem | undefined {
    return this.invoices.find(i => i.status === 'pending');
  }

  openPayment(invoice: InvoiceItem) {
    this.selectedInvoiceForPayment = invoice;
    this.paymentDialogVisible = true;
  }

  onPaymentCompleted(updatedInvoice: InvoiceItem) {
    const index = this.invoices.findIndex(i => i.id === updatedInvoice.id);
    if (index !== -1) {
      this.invoices[index] = updatedInvoice;
    }
  }

  triggerReportCard() {
    if (this.student) {
      this.openReportCard.emit(this.student);
    }
  }

  printIdCard() {
    window.print();
  }
}
