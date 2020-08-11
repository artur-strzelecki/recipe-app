import {
    ADD_TITLE,
    ADD_INGREDIENTS,
    ADD_CONTENT,
    ADD_RESET,
    ADD_CATEGORIES,
    ADD_PHOTO} from '../actions/types';
const START_STATE = { 
    title: '', 
    ingredients: '', 
    content: '',
    categories: '',
    photo: '',
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
                return {...state, title: '', ingredients: '', content: '', photo: '', categories: '1'}; 
        case ADD_CATEGORIES:
            return {...state, categories: action.payload};  
        case ADD_PHOTO:
            return {...state, photo: action.payload};                                                                        
        default:
            return state;
    }
}