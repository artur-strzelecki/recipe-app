import {
    ADD_TITLE,
    ADD_INGREDIENTS,
    ADD_CONTENT,
    ADD_RESET} from '../actions/types';
const START_STATE = { 
    title: '', 
    ingredients: '', 
    content: '',
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
                return {...state, title: '', ingredients: '', content: ''};                                        
        default:
            return state;
    }
}