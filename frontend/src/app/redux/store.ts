import { IStudent } from './student';
import { CREATE_STUDENT, UPDATE_STUDENT, FETCH_STUDENTS, GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from './actions'
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
        case FETCH_STUDENTS: {
            state.students =  action.students;
        }
        case GET_USERS:{
            const newUser = Object.assign({}, state, {
                users: [...action.users],
                lastUpdate: new Date()
            });
            return newUser;
        }
        case CREATE_USER:{
            const newUser = Object.assign({}, state, {
                users: state.users.concat(Object.assign({}, action.user)),
                lastUpdate: new Date()
            });
            return newUser;
        }
        case UPDATE_USER: {
            // not tested but should work
            const newUser = action.user;
            const oldUser = state.users.find(s => s._id === newUser._id);
            const index = state.users.indexOf(oldUser);
            const updatedUsers = Object.assign({}, state, {
                users: [
                    ...state.users.slice(0,index),
                    Object.assign({},newUser),
                    ...state.users.slice(index + 1)
                ]
            })
            return updatedUsers;
        }
        case DELETE_USER: {
            const newUsers = [...state.users.filter( u => u._id != action.userID)];
            const newState = Object.assign({}, state, {users:newUsers});
            return newState;
        }
    }
    return state;
}
