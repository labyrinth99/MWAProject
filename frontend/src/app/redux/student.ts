export interface IStudent {
    status: string;
    enrollmentDate: Date;
    startDateTime: Date;
    enrollmentForm: any;
    examQuestions: any[];
    monitoring: any;
    snapshots:any[];
    grading: any[];
    resultsSent: boolean;
}
