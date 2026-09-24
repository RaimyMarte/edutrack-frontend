import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { StudentService } from '../../../../services/student/student.service';
import { PaginationService } from '../../../../services/ui/pagination.service';
import { SearchService } from '../../../../services/ui/seach.service';
import { PageChangeEvent } from '../../../../types/pageChangeEvent';
import { PaginationQuery } from '../../../../types/paginationQuery';
import { Student } from '../../../../types/student';
import { getPageChangeDetails } from '../../../../utils/getPageChangeDetails';
import { StudentDialogComponent } from '../../../components/student/student-dialog/student-dialog.component';
import { AvatarModule } from 'primeng/avatar';
import { StudentFilterComponent } from '../../../components/student/student-filter/student-filter.component';

import { LanguageService } from '../../../../services/ui/language.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [TableModule, DialogModule, StudentFilterComponent, AvatarModule, StudentDialogComponent, TooltipModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, CommonModule, DropdownModule, TagModule, InputTextModule, FormsModule,],
  providers: [ConfirmationService],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentsListComponent implements OnInit {
  StudentDialog: boolean = false;

  students!: Partial<Student>[];
  student!: Partial<Student>;

  totalStudents: number = 0;
  searchTerm: string = ''
  currentFilters: Record<string, any> = {};

  @ViewChild(StudentDialogComponent) StudentDialogComponent!: StudentDialogComponent;
  @ViewChild(StudentFilterComponent) studentFilterComponent!: StudentFilterComponent;


  constructor(
    private studentService: StudentService,
    private confirmationService: ConfirmationService,
    public paginationService: PaginationService,
    public languageService: LanguageService,
    private searchService: SearchService
  ) { }

  async ngOnInit() {
    this.initializeStudentList()
  }

  initializeStudentList = async () => {
    const currentPage = this.paginationService.getCurrentPage();
    const rowsPerPage = this.paginationService.getItemsPerPage();
    this.searchTerm = this.searchService.getSearchTerm();

    await this.loadStudents({
      currentPage,
      currentPageSize: rowsPerPage,
      search: this.searchTerm,
      ...this.currentFilters,
    });
  };

  async loadStudents(query: PaginationQuery) {
    const { students, total: totalStudents } = await this.studentService.getStudents(query);

    this.students = students;
    this.totalStudents = totalStudents;
  }


  paginate(event: PageChangeEvent) {
    const { currentPage, rowsPerPage } = getPageChangeDetails(event);

    this.paginationService.onPageEvent(currentPage, rowsPerPage);
    this.loadStudents({ currentPage, currentPageSize: rowsPerPage, search: this.searchTerm, ...this.currentFilters, });
  }

  onSearch() {
    this.searchService.onSearchEvent(this.searchTerm);
    const rowsPerPage = this.paginationService.getItemsPerPage();

    this.loadStudents({ currentPage: 1, currentPageSize: rowsPerPage, search: this.searchTerm, ...this.currentFilters, });
  }

  onResetSearch() {
    this.searchService.onResetSearch();
    const rowsPerPage = this.paginationService.getItemsPerPage();
    this.searchTerm = ''

    this.loadStudents({ currentPage: 1, currentPageSize: rowsPerPage, search: '' });
  }

  onFilterApplied(filters: Record<string, any>) {
    this.currentFilters = filters;
    const rowsPerPage = this.paginationService.getItemsPerPage();

    this.loadStudents({
      currentPage: 1,
      currentPageSize: rowsPerPage,
      search: this.searchTerm,
      ...this.currentFilters,
    });
  }

  editStudent(Student: Student) {
    this.StudentDialogComponent.editStudent(Student)
  }

  openNew() {
    this.StudentDialogComponent.openNew()
  }

  openFilterSidebar() {
    this.studentFilterComponent.openFilterSidebar()
  }

  deleteStudent(student: Student) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + student?.FullName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: "p-button-primary",
      rejectButtonStyleClass: "p-button-secondary p-button-text",
      accept: () => {
        this.studentService.deleteStudent(student?.Id);
        this.initializeStudentList()
        this.student = {};
      }
    });
  }

  exportToCsv() {
    if (!this.students || this.students.length === 0) return;

    const headers = ['Code', 'First Name', 'Last Name', 'Age', 'Gender', 'Email', 'Phone', 'Date of Birth', 'Address', 'Parent Name', 'Parent Phone'];
    const rows = this.students.map(s => [
      `"${s.Code || ''}"`,
      `"${s.FirstName || ''}"`,
      `"${s.LastName || ''}"`,
      `"${s.Age || ''}"`,
      `"${s.Gender || ''}"`,
      `"${s.EmailAddress || ''}"`,
      `"${s.PhoneNumber || ''}"`,
      `"${s.DateOfBirth || ''}"`,
      `"${s.Address || ''}"`,
      `"${s.ParentName || ''}"`,
      `"${s.ParentPhoneNumber || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Students_List_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}