export interface IStudentGroup {
  name: string;
  leaderId: string;
  creationDate: Date;
  batchId: string;
}
export interface IGroups {
  _id: string;
  name: string;
  leaderId: any;
  creationDate: Date;

  students: [];
  requests: [];
  groupTitle: string;
  studentId: string;
  approval?: string;
  changes?: string;
  facultyId: string;
  coFacultyId?: string;
  user: string; //    enum: ["student", "faculty"],
}
