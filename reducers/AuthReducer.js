import {
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SPINNER,
    RESET_VAR_LOGIN} from '../actions/types'
const START_STATE = { 
    email: '', 
    password: '', 
    user: null,
    error: '',
    loading: false,
};

export default function AuthReducer (state = START_STATE, action) {
    switch(action.type) {
        case EMAIL_CHANGED:
            return {...state, email: action.payload, error: ''};    
        case PASSWORD_CHANGED:
            return {...state, password: action.payload, error: ''};  
        case LOGIN_SUCCESS:
            return {...state, user: action.payload, error: '', loading: false, email: '', password: ''};
        case LOGIN_FAIL:
            return {...state, error: 'Niepoprawny email lub hasło', password: '', loading: false};   
        case LOGIN_SPINNER:
            return {...state, loading: true, error: ''};
        case RESET_VAR_LOGIN:
            return {...state, email: '', password: '', user: null, error: '', loading: false};                                
        default:
            return state;
    }
}