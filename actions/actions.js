import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGIN_SPINNER,
    CREATE_EMAIL_CHANGED,
    CREATE_PASSWORD_CHANGED,
    CREATE_SPINNER,
    CREATE_SUCCESS,
    CREATE_FAIL,
    RESET_VAR_LOGIN,
    CREATE_RESET_VAR_LOGIN,
    CHANGE_SEARCH,
    RESET_SEARCH,
    ADD_TITLE,
    ADD_INGREDIENTS,
    ADD_CONTENT,
    ADD_RESET,
    ADD_CATEGORIES,
    ADD_PHOTO,
    ADD_TIME,
    ADD_FAVOURITE,
    DELETE_FAVOURITE,
    RESET_FAVOURITE} from './types';
import firebase from 'firebase';
import {Keyboard } from 'react-native';


// check and login user
export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text,
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text,
    };
};

export const loginUser = ({email, password}) => {
    Keyboard.dismiss();
    return (dispatch) => {
        dispatch({type: LOGIN_SPINNER});
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(user => loginUserSuccess(dispatch,user))
        .catch(() => loginUserFail(dispatch));
    };
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({type: LOGIN_SUCCESS, payload: user});
};

const loginUserFail = (dispatch) => {
    dispatch({type: LOGIN_FAIL})
};

export const resetVar = () => {
    return {
        type: RESET_VAR_LOGIN,
    };
};

// create new account 

export const createEmailChanged = (text) => {
    return {
        type: CREATE_EMAIL_CHANGED,
        payload: text,
    };
};

export const createPasswordChanged = (text) => {
    return {
        type: CREATE_PASSWORD_CHANGED,
        payload: text,
    };
};

export const CreateUser = ({email, password}) => {
    Keyboard.dismiss();
    return (dispatch) => {
        dispatch({type: CREATE_SPINNER});
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => createUserSuccess(dispatch,user))
        .catch(() => createUserFail(dispatch));
    };
};
const createUserSuccess = (dispatch, user) => {
    dispatch({type: CREATE_SUCCESS, payload: user});
};

const createUserFail = (dispatch) => {
    dispatch({type: CREATE_FAIL});
};

export const createResetVar = () => {
    return {
        type: CREATE_RESET_VAR_LOGIN,
    };
};

// search bar

export const searchChange = (text) => {
    return {
        type: CHANGE_SEARCH,
        payload: text,
    };
};

export const resertSearch = () => {
    return {
        type: RESET_SEARCH,
    };
};


// add recipe

export const AddTitle = (text) => {
    return {
        type: ADD_TITLE,
        payload: text,
    };
};

export const AddIngredients = (text) => {
    return {
        type: ADD_INGREDIENTS,
        payload: text,
    };
};

export const AddContent = (text) => {
    return {
        type: ADD_CONTENT,
        payload: text,
    };
};

export const AddCategories = (text) => {
    return {
        type: ADD_CATEGORIES,
        payload: text,
    };
};

export const AddPhoto = (text) => {
    return {
        type: ADD_PHOTO,
        payload: text,
    };
};

export const AddTime = (text) => {
    return {
        type: ADD_TIME,
        payload: text,
    };
};

export const AddReset = () => {
    return {
        type: ADD_RESET,
    };
};

//favourite

export const AddFav = () => {
    return {
        type: ADD_FAVOURITE,
    };    
};

export const DelFav = () => {
    return {
        type: DELETE_FAVOURITE,
    };    
};

export const ResetFav = () => {
    return {
        type: RESET_FAVOURITE,
    };    
};






