import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../../services/auth/auth.service';
import { SubjectService } from '../../../services/subject/subject.service';
import { Subject } from '../../../types/subject';
import { User } from '../../../types/user';
import { LanguageService } from '../../../services/ui/language.service';

@Component({
  selector: 'app-professor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule, TagModule, TooltipModule],
  templateUrl: './professor-dashboard.component.html',
  styleUrl: './professor-dashboard.component.css'
})
export class ProfessorDashboardComponent implements OnInit {
  currentUser: User | null = null;
  mySubjects: Subject[] = [];
  loading: boolean = true;

  constructor(
    public authService: AuthService,
    public languageService: LanguageService,
    private subjectService: SubjectService
  ) {}

  async ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    await this.loadMySubjects();
  }

  async loadMySubjects() {
    try {
      this.loading = true;
      const res = await this.subjectService.getSubjects({ currentPage: 1, currentPageSize: 20, search: '' });
      // If professor, filter to their subjects or show all if none assigned
      const all = res?.subjects || [];
      const filtered = all.filter(s => s.ProfessorId === this.currentUser?.Id);
      this.mySubjects = filtered.length > 0 ? filtered : all;
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
}
