import { Injectable } from '@angular/core';
import { Student } from '../../types/student';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { StudentSubjectCross } from '../../types/studentSubjectCross';

interface SaveSubjectEnrollmentBody {
    SubjectId: string;
    EnrollStudents: string[];
    NotEnrollStudents: string[];
}

interface SaveStudentsGradesBody {
    SubjectId: string;
    GradesMap: {
        StudentSubjectCrossId: string,
        Grade: number,
        Exam1?: number | null,
        Exam2?: number | null,
        Project?: number | null,
        FinalExam?: number | null
    }[]
}

export interface EnrolledStudentsWithGrades extends StudentSubjectCross {
    Student: Student;
}


@Injectable({
    providedIn: 'root'
})

export class StudentSubjectCrossService {
    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    async getEnrolledStudents(subjectId: string) {
        const response = await this.apiService.get(`/students_in_subject/${subjectId}`, this.authService.authHeader());
        const data = response?.data as Student[];

        return data
    }

    async getStudentsNotEnrolled(subjectId: string) {
        const response = await this.apiService.get(`/students_out_subject/${subjectId}`, this.authService.authHeader());
        const data = response?.data as Student[];

        return data
    }

    async getEnrolledStudentsWithGrades(subjectId: string) {
        const response = await this.apiService.get(`/students_in_subject_with_grades/${subjectId}`, this.authService.authHeader());
        const data = response?.data as EnrolledStudentsWithGrades[];

        return data
    }


    async saveSubjectEnrollment(body: SaveSubjectEnrollmentBody) {
        await this.apiService.post('/save_subject_enrollment', body, this.authService.authHeader());
    }

    async saveStudentsGrades(body: SaveStudentsGradesBody) {
        await this.apiService.post('/save_students_grades', body, this.authService.authHeader());
    }
}
