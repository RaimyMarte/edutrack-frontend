import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { LanguageService } from '../../../../services/ui/language.service';
import { Student } from '../../../../types/student';

export interface InvoiceItem {
  id: string;
  conceptKey: string;
  conceptFallback: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending';
  paidDate?: string;
  receiptNumber?: string;
  paymentMethod?: string;
}

@Component({
  selector: 'app-student-payment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    RippleModule
  ],
  templateUrl: './student-payment-dialog.component.html',
  styleUrls: ['./student-payment-dialog.component.css']
})
export class StudentPaymentDialogComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() student: Student | null = null;
  @Input() selectedInvoice: InvoiceItem | null = null;
  
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() paymentCompleted = new EventEmitter<InvoiceItem>();

  // Payment form state
  paymentMethod: 'card' | 'transfer' = 'card';
  cardLast4: string = '8842';
  cardHolder: string = 'ALEJANDRO RAMIREZ';
  expiryDate: string = '08/28';
  cvv: string = '382';
  
  isProcessing: boolean = false;
  paymentSuccess: boolean = false;
  processedInvoice: InvoiceItem | null = null;
  showDirectReceipt: boolean = false;

  constructor(public languageService: LanguageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedInvoice'] || changes['visible']) {
      if (this.visible && this.selectedInvoice) {
        if (this.selectedInvoice.status === 'paid') {
          // If invoice is already paid, directly display the official receipt!
          this.showDirectReceipt = true;
          this.processedInvoice = this.selectedInvoice;
          this.paymentSuccess = false;
        } else {
          // If pending, show the checkout payment form
          this.showDirectReceipt = false;
          this.paymentSuccess = false;
          this.processedInvoice = null;
        }
      }
    }
  }

  printReceipt() {
    window.print();
  }

  close() {
    if (this.isProcessing) return;
    this.visible = false;
    this.visibleChange.emit(false);
    this.paymentSuccess = false;
    this.showDirectReceipt = false;
  }

  processPayment() {
    if (!this.selectedInvoice) return;
    this.isProcessing = true;

    setTimeout(() => {
      this.isProcessing = false;
      this.paymentSuccess = true;

      const updatedInvoice: InvoiceItem = {
        ...this.selectedInvoice!,
        status: 'paid',
        paidDate: new Date().toISOString().split('T')[0],
        receiptNumber: `REC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
        paymentMethod: this.paymentMethod === 'card' ? `Visa •••• ${this.cardLast4 || '8842'}` : 'Transferencia Bancaria'
      };

      this.processedInvoice = updatedInvoice;
      this.paymentCompleted.emit(updatedInvoice);
    }, 1200);
  }

  viewOfficialReceiptAfterPay() {
    this.showDirectReceipt = true;
    this.paymentSuccess = false;
  }
}
