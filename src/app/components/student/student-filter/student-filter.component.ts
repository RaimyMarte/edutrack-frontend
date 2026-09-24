import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { MaintenanceService } from '../../../../services/maintenance/maintenance.service';
import { Maintenance } from '../../../../types/maintenance';
import { LanguageService } from '../../../../services/ui/language.service';

@Component({
  selector: 'app-student-filter',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarModule, RippleModule, InputNumberModule, ButtonModule, InputTextModule, CommonModule, DropdownModule, FormsModule,],
  templateUrl: './student-filter.component.html',
  styleUrl: './student-filter.component.css'
})
export class StudentFilterComponent {
  studentFilterSidebar: boolean = false;

  get genderOptions() {
    return [
      { Id: 'M', Name: this.languageService.t('male') },
      { Id: 'F', Name: this.languageService.t('female') },
      { Id: 'U', Name: this.languageService.t('other') },
    ];
  }

  @Output() filterApplied = new EventEmitter<any>();

  studentFilterForm = signal<FormGroup>(
    new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      gender: new FormControl(''),
      nationalityId: new FormControl(''),
      emailAddress: new FormControl(''),
      phoneNumber: new FormControl(''),
      code: new FormControl(''),
      parentName: new FormControl(''),
    })
  )

  submitted: boolean = false;
  nationalities: Maintenance[] = []

  constructor(
    public languageService: LanguageService,
    private maintenanceService: MaintenanceService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    const selectedMaintenances = ['Nationality']
    const data = await this.maintenanceService.getSelectedMaintenances(selectedMaintenances);
    this.nationalities = data?.Nationality
  }

  openFilterSidebar() {
    this.studentFilterSidebar = true;
  }

  resetFilter() {
    this.studentFilterForm().reset();

    const formData = this.studentFilterForm().value
    this.filterApplied.emit(formData);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: formData,
      queryParamsHandling: 'merge',
    });

    this.studentFilterSidebar = false;
  }


  hideFilterSidebar() {
    this.studentFilterSidebar = false;
    this.submitted = false;
  }

  applyFilter() {
    this.submitted = true;

    if (this.studentFilterForm().valid) {
      const formData = this.studentFilterForm().value

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: formData,
        queryParamsHandling: 'merge',
      });

      this.filterApplied.emit(formData);
      this.hideFilterSidebar();
    }
  }
}