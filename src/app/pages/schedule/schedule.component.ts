import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../../services/auth/auth.service';
import { LanguageService } from '../../../services/ui/language.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../types/user';

export interface ScheduleItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  professorId: string;
  dayKey: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
  startTime: string;
  endTime: string;
  room: string;
  instructor: string;
  instructorAvatar?: string;
  colorClass: string;
  badgeClass: string;
  type: string;
}

import { effect } from '@angular/core';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    InputTextModule,
    ToolbarModule,
    SelectButtonModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  selectedDay: string = 'all';
  selectedProfessor: string = 'all';
  searchTerm: string = '';
  searchFilter: string = '';
  currentUser: User | null = null;
  professorsList: User[] = [];
  dayOptions: Array<{ label: string; value: string }> = [];

  days: Array<{ key: string; labelKey: string }> = [
    { key: 'all', labelKey: 'allDays' },
    { key: 'monday', labelKey: 'monday' },
    { key: 'tuesday', labelKey: 'tuesday' },
    { key: 'wednesday', labelKey: 'wednesday' },
    { key: 'thursday', labelKey: 'thursday' },
    { key: 'friday', labelKey: 'friday' },
  ];

  initDayOptions() {
    this.dayOptions = this.days.map(d => ({
      label: this.languageService.t(d.labelKey),
      value: d.key
    }));
  }

  onDayChange(event: any) {
    if (!this.selectedDay) {
      this.selectedDay = 'all';
    }
  }

  onSearch() {
    this.searchFilter = this.searchTerm.trim();
  }

  onResetSearch() {
    this.searchTerm = '';
    this.searchFilter = '';
  }

  scheduleItems: ScheduleItem[] = [
    {
      id: 'sch-1',
      subjectCode: 'MAT-101',
      subjectName: 'Cálculo Diferencial',
      professorId: 'usr-2',
      dayKey: 'monday',
      startTime: '08:00 AM',
      endTime: '10:00 AM',
      room: 'Aula A-204 (Campus Central)',
      instructor: 'Carlos Santana',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      colorClass: 'bg-blue-50/80 border-blue-200 border-l-4 border-l-blue-600',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
      type: 'Teoría / Cátedra'
    },
    {
      id: 'sch-2',
      subjectCode: 'INF-201',
      subjectName: 'Estructuras de Datos y Algoritmos',
      professorId: 'usr-3',
      dayKey: 'monday',
      startTime: '10:30 AM',
      endTime: '12:30 PM',
      room: 'Laboratorio de Computación 3',
      instructor: 'Elena Gomez',
      instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      colorClass: 'bg-indigo-50/80 border-indigo-200 border-l-4 border-l-indigo-600',
      badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      type: 'Laboratorio Práctico'
    },
    {
      id: 'sch-3',
      subjectCode: 'FIS-102',
      subjectName: 'Física Mecánica',
      professorId: 'usr-4',
      dayKey: 'tuesday',
      startTime: '09:00 AM',
      endTime: '11:00 AM',
      room: 'Laboratorio de Física Experimental',
      instructor: 'Marco Diaz',
      instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      colorClass: 'bg-amber-50/80 border-amber-200 border-l-4 border-l-amber-600',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
      type: 'Taller Experimental'
    },
    {
      id: 'sch-4',
      subjectCode: 'DB-301',
      subjectName: 'Bases de Datos Relacionales',
      professorId: 'usr-5',
      dayKey: 'tuesday',
      startTime: '02:00 PM',
      endTime: '04:00 PM',
      room: 'Centro de Datos / Aula 102',
      instructor: 'Laura Perez',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      colorClass: 'bg-emerald-50/80 border-emerald-200 border-l-4 border-l-emerald-600',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      type: 'Teoría y Práctica'
    },
    {
      id: 'sch-5',
      subjectCode: 'MAT-101',
      subjectName: 'Cálculo Diferencial (Tutoría)',
      professorId: 'usr-2',
      dayKey: 'wednesday',
      startTime: '08:00 AM',
      endTime: '10:00 AM',
      room: 'Aula A-204 (Campus Central)',
      instructor: 'Carlos Santana',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      colorClass: 'bg-blue-50/80 border-blue-200 border-l-4 border-l-blue-600',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
      type: 'Tutoría de Ejercicios'
    },
    {
      id: 'sch-6',
      subjectCode: 'INF-201',
      subjectName: 'Estructuras de Datos y Algoritmos',
      professorId: 'usr-3',
      dayKey: 'thursday',
      startTime: '10:30 AM',
      endTime: '12:30 PM',
      room: 'Laboratorio de Computación 3',
      instructor: 'Elena Gomez',
      instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      colorClass: 'bg-indigo-50/80 border-indigo-200 border-l-4 border-l-indigo-600',
      badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      type: 'Laboratorio Avanzado'
    },
    {
      id: 'sch-7',
      subjectCode: 'DB-301',
      subjectName: 'Bases de Datos Relacionales (SQL Lab)',
      professorId: 'usr-5',
      dayKey: 'friday',
      startTime: '09:00 AM',
      endTime: '12:00 PM',
      room: 'Laboratorio SQL 1',
      instructor: 'Laura Perez',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      colorClass: 'bg-emerald-50/80 border-emerald-200 border-l-4 border-l-emerald-600',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      type: 'Proyecto Final'
    }
  ];

  constructor(
    public authService: AuthService,
    public languageService: LanguageService,
    private userService: UserService
  ) {
    this.initDayOptions();
    effect(() => {
      // Re-initialize day options reactively when language changes
      const _ = this.languageService.currentLang();
      this.initDayOptions();
    });
  }

  async ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    if (this.isAdministrator) {
      try {
        this.professorsList = await this.userService.getProfessors();
      } catch (err) {
        console.error(err);
      }
    }
  }

  get isProfessor(): boolean {
    return this.currentUser?.UserRoleId === 2;
  }

  get isAdministrator(): boolean {
    return this.currentUser?.UserRoleId === 1 || !this.currentUser;
  }

  get professorDropdownOptions() {
    return [
      { label: this.languageService.t('allProfessors'), value: 'all' },
      ...this.professorsList.map(p => ({ label: p.FullName, value: p.Id }))
    ];
  }

  get filteredSchedule(): ScheduleItem[] {
    return this.scheduleItems.filter(item => {
      // 1. Role-based Professor Filter
      let matchesProfessor = true;
      if (this.isProfessor) {
        matchesProfessor = item.professorId === this.currentUser?.Id;
      } else if (this.selectedProfessor !== 'all') {
        matchesProfessor = item.professorId === this.selectedProfessor;
      }

      // 2. Day Filter
      const matchesDay = this.selectedDay === 'all' || item.dayKey === this.selectedDay;

      // 3. Search Filter
      const search = this.searchFilter.toLowerCase().trim();
      const matchesSearch = !search ||
        item.subjectName.toLowerCase().includes(search) ||
        item.subjectCode.toLowerCase().includes(search) ||
        item.instructor.toLowerCase().includes(search) ||
        item.room.toLowerCase().includes(search);

      return matchesProfessor && matchesDay && matchesSearch;
    });
  }

  getItemsByDay(dayKey: string): ScheduleItem[] {
    return this.filteredSchedule.filter(item => item.dayKey === dayKey);
  }
}
