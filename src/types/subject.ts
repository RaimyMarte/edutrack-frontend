import { User } from './user';

export interface Subject {
  Id: string;
  Code: string | null;
  Name: string;
  Description: string | null;
  Enabled: boolean;
  StatusId: number;
  StartDate: string;
  ProfessorId: string;
  Professor?: User | null;
  EndDate: string;
  CreatedBy: string | null;
  CreatedDate: string;
  LastUpdatedBy: string | null;
  LastUpdatedDate: string | null;
}