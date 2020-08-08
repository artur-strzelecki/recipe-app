import { 
    CREATE_EMAIL_CHANGED,
    CREATE_PASSWORD_CHANGED,
    CREATE_SPINNER,
    CREATE_SUCCESS,
    CREATE_FAIL,
    CREATE_RESET_VAR_LOGIN}  from '../actions/types'
const START_STATE = { 
    email: '', 
    password: '', 
    user: null,
    error: '',
    loading: false,
};

export default function LoginReducer (state = START_STATE, action) {
    switch(action.type) {
        case CREATE_EMAIL_CHANGED:
            return {...state, email: action.payload, error: ''};    
        case CREATE_PASSWORD_CHANGED:
            return {...state, password: action.payload, error: ''};  
        case CREATE_SUCCESS:
            return {...state, user: action.payload, error: 'Utworzono konto!', loading: false, email: '', password: ''};
        case CREATE_FAIL:
            return {...state, error: 'Nie udało się utworzyć konta', password: '', loading: false, email: '', password: ''};   
        case CREATE_SPINNER:
            return {...state, loading: true, error: ''};  
        case CREATE_RESET_VAR_LOGIN:
            return {...state, email: '', password: '', user: null, error: '', loading: false};                              
        default:
            return state;
    }
}