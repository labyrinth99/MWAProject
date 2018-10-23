import { IStudent } from './student';
import { CREATE_STUDENT, UPDATE_STUDENT, FETCH_STUDENTS } from './actions'
import { IQuestion } from './question';
import { IUser } from './user';

export interface IAppState{
    students: IStudent[];
    questions: IQuestion[];
    users: IUser[];
    lastUpdate;
}

export const INITIAL_STATE: IAppState = {
    students: [],
    questions: [],
    users:[],
    lastUpdate: null
}

export function rootReducer(state, action){
    switch(action.type){
        case CREATE_STUDENT: {
            //uses Object.assign cus can`t change the objects in the params
            const newStudent = Object.assign({}, state, {
                students: state.students.concat(Object.assign({}, action.student)),
                lastUpdate: new Date()
            });
            return newStudent;
        }

        case UPDATE_STUDENT: {
            const newStudent = action.student;
            const oldStudent = state.students.find(s => s._id === newStudent._id);
            const index = state.students.indexOf(oldStudent);
            const updatedStudent = Object.assign({}, state, {
                students: [
                    ...state.students.slice(0,index),
                    Object.assign({},newStudent),
                    ...state.students.slice(index + 1)
                ]
            })
            return updatedStudent;
        }
        case FETCH_STUDENTS: {
            state.students =  action.students;
        }
    }
    return state;
}