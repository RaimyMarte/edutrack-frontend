export interface StudentSubjectCross {
  Id: string;
  SignatureId: string;
  StudentId: string;
  CreatedDate: Date;
  CreatedBy: string | null;
  Grade: number | null;
  LetterGrade: string | null;
  Exam1?: number | null;
  Exam2?: number | null;
  Project?: number | null;
  FinalExam?: number | null;
}
