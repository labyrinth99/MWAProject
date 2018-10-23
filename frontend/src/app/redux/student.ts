export interface IStudent {
    _id: string;
    status: string;
    enrollmentDate: Date;
    enrollmentForm: any;
    examQuestions: any[];
    monitoring: any[];
    snapshots:any[];
    grading: any[];
    resultsSent: boolean;
}
