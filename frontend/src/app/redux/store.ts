import { IStudent } from './student';
import { CREATE_STUDENT, UPDATE_STUDENT, RETAKE_EXAM, GRADE_EXAM} from './actions'

export interface IAppState{
    students: IStudent[];
    lastUpdate
}

export const INITIAL_STATE: IAppState = {
    students: [],
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
            // not tested but should work
            const newStudent = action.student;
            const oldStudent = state.students.find(s => s._id === newStudent._id);
            console.log('old student:' + oldStudent);
            console.log('new student:' + newStudent);
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
    }
    return state;
}