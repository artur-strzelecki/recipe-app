import {
    ADD_TITLE,
    ADD_INGREDIENTS,
    ADD_CONTENT,
    ADD_RESET,
    ADD_CATEGORIES,
    ADD_PHOTO,
    ADD_TIME,
    ADD_SUBMIT} from '../actions/types';
const START_STATE = { 
    title: '', 
    ingredients: '', 
    content: '',
    categories: '',
    photo: '',
    time: '',
    submit: false,
    opacity: 1,
};

export default function AddRecipeReducer (state = START_STATE, action) {
    switch(action.type) {
        case ADD_TITLE:
            return {...state, title: action.payload};    
        case ADD_INGREDIENTS:
            return {...state, ingredients: action.payload};  
        case ADD_CONTENT:
            return {...state, content: action.payload};
        case ADD_RESET:
                return {...state, title: '', ingredients: '', content: '', photo: '', categories: '1', time: ''}; 
        case ADD_CATEGORIES:
            return {...state, categories: action.payload};  
        case ADD_PHOTO:
            return {...state, photo: action.payload};  
        case ADD_TIME:
            return {...state, time: action.payload}; 
        case ADD_SUBMIT:
            let opa;
            if (action.payload === true)
            {
                opa = 0.2;
            }
            else 
            {
                opa = 1;
            }
            return {...state, submit: action.payload, opacity: opa};                                                                                                  
        default:
            return state;
    }
}