import { Injectable } from '@angular/core';
import { Student } from '../../types/student';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { PaginationQuery } from '../../types/paginationQuery';

interface StudentBody {
    Code?: string | null;
    FirstName: string;
    LastName: string;
    Address?: string | null;
    DateOfBirth: string;
    Gender?: string | null;
    EmailAddress?: string | null;
    PhoneNumber?: string | null;
    ParentName?: string | null;
    ParentPhoneNumber?: string | null;
}

@Injectable({
    providedIn: 'root'
})

export class StudentService {
    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }


    async getStudents(query: PaginationQuery & {
        [key: string]: any;
    }) {
        const queryParams = new URLSearchParams();

        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                queryParams.append(key, value instanceof Date ? value.toISOString() : value.toString());
            }
        });

        const response = await this.apiService.get(`/student_get_all?${queryParams.toString()}`, this.authService.authHeader());
        const students = response?.data as Student[];

        return {
            students,
            total: response?.total
        };
    }


    async getStudentById(studentId: string) {
        const response = await this.apiService.get(`/student_by_id/${studentId}`, this.authService.authHeader());
        const student = response?.data as Student;

        return student;
    }

    async createStudent(body: StudentBody) {
        await this.apiService.post('/create_student', body, this.authService.authHeader());
    }

    async updateStudent({ body, studentId }: { body: StudentBody, studentId: string }) {
        await this.apiService.patch(`/update_student/${studentId}`, body, this.authService.authHeader());
    }

    async deleteStudent(studentId: string) {
        await this.apiService.delete(`/delete_student/${studentId}`, this.authService.authHeader());
    }

    async getStudentReportCard(studentId: string) {
        const response = await this.apiService.get(`/student_report_card/${studentId}`, this.authService.authHeader());
        return response?.data || [];
    }
}
