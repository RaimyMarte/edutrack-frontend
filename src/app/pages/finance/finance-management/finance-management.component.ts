import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LanguageService } from '../../../../services/ui/language.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { Student } from '../../../../types/student';
import { StudentPaymentDialogComponent, InvoiceItem } from '../../../components/student/student-payment-dialog/student-payment-dialog.component';

export interface AdminStudentInvoice extends InvoiceItem {
  student: Student;
  program: string;
}

@Component({
  selector: 'app-finance-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TableModule,
    ButtonModule,
    TagModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    TooltipModule,
    ToastModule,
    StudentPaymentDialogComponent
  ],
  providers: [MessageService],
  templateUrl: './finance-management.component.html',
  styleUrls: ['./finance-management.component.css']
})
export class FinanceManagementComponent implements OnInit {
  searchTerm: string = '';
  selectedStatusFilter: string = 'ALL';

  // Modal states
  receiptModalVisible: boolean = false;
  selectedInvoice: InvoiceItem | null = null;
  selectedStudent: Student | null = null;

  // Manual payment cashier modal
  manualPayModalVisible: boolean = false;
  manualPaymentMethod: string = 'Efectivo / Ventanilla';
  cashierNotes: string = '';
  selectedInvoiceForManualPay: AdminStudentInvoice | null = null;

  paymentMethodOptions = [
    { label: 'Efectivo en Ventanilla / Caja', value: 'Efectivo / Ventanilla' },
    { label: 'Tarjeta POS (Ventanilla)', value: 'Tarjeta POS (Ventanilla)' },
    { label: 'Transferencia Banco BHD', value: 'Transferencia Banco BHD' },
    { label: 'Transferencia Banreservas', value: 'Transferencia Banreservas' },
    { label: 'Cheque Institucional', value: 'Cheque Institucional' }
  ];

  // Mock Students
  private student1: Student = {
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
    Address: 'Av. 27 de Febrero #45, Santo Domingo',
    Picture: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    CreatedDate: '2024-01-10T08:00:00',
    StatusId: 1
  };

  private student2: Student = {
    Id: 'stu-2',
    Code: 'STU-2024-002',
    FirstName: 'Sofia',
    LastName: 'Valenzuela',
    FullName: 'Sofia Valenzuela',
    DateOfBirth: '2003-07-22',
    Age: 21,
    Gender: 'F',
    NationalityId: 1,
    EmailAddress: 'sofia.valenzuela@gmail.com',
    PhoneNumber: '(809) 555-1202',
    Address: 'Calle El Sol #12, Santiago',
    Picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    CreatedDate: '2024-01-11T08:00:00',
    StatusId: 1
  };

  private student3: Student = {
    Id: 'stu-3',
    Code: 'STU-2024-003',
    FirstName: 'Carlos',
    LastName: 'Mendez',
    FullName: 'Carlos Mendez',
    DateOfBirth: '2002-11-05',
    Age: 22,
    Gender: 'M',
    NationalityId: 1,
    EmailAddress: 'carlos.mendez@gmail.com',
    PhoneNumber: '(809) 555-1303',
    Address: 'Bella Vista, Santo Domingo',
    Picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    CreatedDate: '2024-01-12T08:00:00',
    StatusId: 1
  };

  private student4: Student = {
    Id: 'stu-4',
    Code: 'STU-2024-004',
    FirstName: 'Gabriela',
    LastName: 'Santos',
    FullName: 'Gabriela Santos',
    DateOfBirth: '2004-01-19',
    Age: 20,
    Gender: 'F',
    NationalityId: 1,
    EmailAddress: 'gabriela.santos@gmail.com',
    PhoneNumber: '(809) 555-1404',
    Address: 'Los Prados, Santo Domingo',
    Picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    CreatedDate: '2024-01-14T08:00:00',
    StatusId: 1
  };

  invoices: AdminStudentInvoice[] = [
    {
      id: 'inv-101',
      student: this.student1,
      program: 'Ingeniería de Software',
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
      student: this.student1,
      program: 'Ingeniería de Software',
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
      student: this.student1,
      program: 'Ingeniería de Software',
      conceptKey: 'tuitionInstallment2',
      conceptFallback: 'Cuota de Matrícula 2 (Medio Término)',
      dueDate: '2024-10-30',
      amount: 18500.00,
      status: 'pending'
    },
    {
      id: 'inv-201',
      student: this.student2,
      program: 'Ingeniería de Software',
      conceptKey: 'tuitionInstallment1',
      conceptFallback: 'Cuota de Matrícula 1 (Inscripción)',
      dueDate: '2024-08-30',
      amount: 18500.00,
      status: 'paid',
      paidDate: '2024-08-27',
      receiptNumber: 'REC-2024-79810',
      paymentMethod: 'Transferencia Banco BHD'
    },
    {
      id: 'inv-202',
      student: this.student2,
      program: 'Ingeniería de Software',
      conceptKey: 'tuitionInstallment2',
      conceptFallback: 'Cuota de Matrícula 2 (Medio Término)',
      dueDate: '2024-10-30',
      amount: 18500.00,
      status: 'paid',
      paidDate: '2024-10-15',
      receiptNumber: 'REC-2024-91204',
      paymentMethod: 'Tarjeta Visa •••• 4129'
    },
    {
      id: 'inv-301',
      student: this.student3,
      program: 'Ingeniería de Sistemas',
      conceptKey: 'tuitionInstallment1',
      conceptFallback: 'Cuota de Matrícula 1 (Inscripción)',
      dueDate: '2024-08-30',
      amount: 18500.00,
      status: 'paid',
      paidDate: '2024-08-30',
      receiptNumber: 'REC-2024-82019',
      paymentMethod: 'Efectivo / Ventanilla'
    },
    {
      id: 'inv-302',
      student: this.student3,
      program: 'Ingeniería de Sistemas',
      conceptKey: 'tuitionInstallment2',
      conceptFallback: 'Cuota de Matrícula 2 (Medio Término)',
      dueDate: '2024-10-30',
      amount: 18500.00,
      status: 'pending'
    },
    {
      id: 'inv-401',
      student: this.student4,
      program: 'Ciberseguridad',
      conceptKey: 'tuitionInstallment1',
      conceptFallback: 'Cuota de Matrícula 1 (Inscripción)',
      dueDate: '2024-08-30',
      amount: 18500.00,
      status: 'paid',
      paidDate: '2024-08-25',
      receiptNumber: 'REC-2024-77412',
      paymentMethod: 'Tarjeta Visa •••• 9921'
    },
    {
      id: 'inv-402',
      student: this.student4,
      program: 'Ciberseguridad',
      conceptKey: 'labFee',
      conceptFallback: 'Cuota de Laboratorios & Tecnología',
      dueDate: '2024-09-15',
      amount: 4200.00,
      status: 'paid',
      paidDate: '2024-09-10',
      receiptNumber: 'REC-2024-84190',
      paymentMethod: 'Transferencia Banreservas'
    },
    {
      id: 'inv-403',
      student: this.student4,
      program: 'Ciberseguridad',
      conceptKey: 'tuitionInstallment2',
      conceptFallback: 'Cuota de Matrícula 2 (Medio Término)',
      dueDate: '2024-10-30',
      amount: 18500.00,
      status: 'pending'
    }
  ];

  constructor(
    public languageService: LanguageService,
    private notificationService: NotificationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  // Filtered List
  get filteredInvoices(): AdminStudentInvoice[] {
    return this.invoices.filter(item => {
      const matchesStatus =
        this.selectedStatusFilter === 'ALL' ||
        (this.selectedStatusFilter === 'PAID' && item.status === 'paid') ||
        (this.selectedStatusFilter === 'PENDING' && item.status === 'pending');

      const term = this.searchTerm.toLowerCase().trim();
      if (!term) return matchesStatus;

      const matchesSearch =
        item.student.FullName.toLowerCase().includes(term) ||
        (item.student.Code && item.student.Code.toLowerCase().includes(term)) ||
        item.conceptFallback.toLowerCase().includes(term) ||
        (item.receiptNumber && item.receiptNumber.toLowerCase().includes(term)) ||
        (item.paymentMethod && item.paymentMethod.toLowerCase().includes(term));

      return matchesStatus && matchesSearch;
    });
  }

  // Financial Metrics
  get totalCollected(): number {
    return this.invoices
      .filter(i => i.status === 'paid')
      .reduce((sum, i) => sum + i.amount, 0);
  }

  get totalPending(): number {
    return this.invoices
      .filter(i => i.status === 'pending')
      .reduce((sum, i) => sum + i.amount, 0);
  }

  get totalInvoiced(): number {
    return this.invoices.reduce((sum, i) => sum + i.amount, 0);
  }

  get collectionRate(): number {
    if (this.totalInvoiced === 0) return 100;
    return Math.round((this.totalCollected / this.totalInvoiced) * 100);
  }

  get uniqueStudentsCount(): number {
    const studentIds = new Set(this.invoices.map(i => i.student.Id));
    return studentIds.size;
  }

  get solventStudentsCount(): number {
    const students = [this.student1, this.student2, this.student3, this.student4];
    return students.filter(s => {
      const pending = this.invoices.filter(i => i.student.Id === s.Id && i.status === 'pending');
      return pending.length === 0;
    }).length;
  }

  // Actions
  viewReceipt(item: AdminStudentInvoice) {
    this.selectedInvoice = item;
    this.selectedStudent = item.student;
    this.receiptModalVisible = true;
  }

  openManualPayDialog(item: AdminStudentInvoice) {
    this.selectedInvoiceForManualPay = item;
    this.manualPaymentMethod = 'Efectivo / Ventanilla';
    this.cashierNotes = '';
    this.manualPayModalVisible = true;
  }

  confirmManualCashierPayment() {
    if (!this.selectedInvoiceForManualPay) return;

    const randomFolio = 'REC-2024-' + Math.floor(10000 + Math.random() * 90000);
    const now = new Date().toISOString().split('T')[0];

    this.selectedInvoiceForManualPay.status = 'paid';
    this.selectedInvoiceForManualPay.paidDate = now;
    this.selectedInvoiceForManualPay.receiptNumber = randomFolio;
    this.selectedInvoiceForManualPay.paymentMethod = this.manualPaymentMethod;

    const studentName = this.selectedInvoiceForManualPay.student.FullName;
    this.manualPayModalVisible = false;

    this.messageService.add({
      severity: 'success',
      summary: this.languageService.currentLang() === 'es' ? 'Pago Registrado' : 'Payment Registered',
      detail: this.languageService.t('paymentRegisteredSuccess')
    });

    this.notificationService.addNotification({
      titleKey: 'paymentSuccess',
      messageKey: 'paymentSuccessSub',
      icon: 'pi pi-check-circle',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
      timeKey: 'justNow',
      link: '/finances'
    });
  }

  sendReminder(item: AdminStudentInvoice) {
    this.messageService.add({
      severity: 'info',
      summary: this.languageService.currentLang() === 'es' ? 'Recordatorio Enviado' : 'Reminder Sent',
      detail: `${this.languageService.t('reminderSent')} (${item.student.FullName})`
    });
  }

  exportReport() {
    const headers = ['Estudiante', 'Matrícula', 'Concepto', 'Monto (USD)', 'Vencimiento', 'Estado', 'Fecha Pago', 'No. Recibo', 'Método'];
    const rows = this.filteredInvoices.map(i => [
      `"${i.student.FullName}"`,
      `"${i.student.Code}"`,
      `"${i.conceptFallback}"`,
      i.amount.toFixed(2),
      i.dueDate,
      i.status === 'paid' ? 'PAGADO' : 'PENDIENTE',
      i.paidDate || '-',
      i.receiptNumber || '-',
      `"${i.paymentMethod || '-'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `edutrack_finanzas_reporte_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
