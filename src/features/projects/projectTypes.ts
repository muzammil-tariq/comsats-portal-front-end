interface IDetails {
  methodology: string;
  tools: string[];
  technology: string[];
  outcome: string;
  initiator: string;
}

export interface IProject {
  _id: string;
  title: string;
  description: string;
  status: string;
  approval: string;
  changes?: string;
  facultyId: string;
  coFacultyId?: string;
  uploadDate: Date;
  details: IDetails;
  user: string; //    enum: ["student", "faculty"],
}
