import {
    ADD_FAVOURITE,
    DELETE_FAVOURITE,
    RESET_FAVOURITE} from '../actions/types';
const START_STATE = { 
    changeFav: null,
};

export default function FavReducer (state = START_STATE, action) {
    switch(action.type) {
        case ADD_FAVOURITE:
            return {...state, changeFav: true};   
        case DELETE_FAVOURITE:
            return {...state, changeFav: false}; 
        case RESET_FAVOURITE:
            return {...state, changeFav: null};                                                                                                              
        default:
            return state;
    }
}