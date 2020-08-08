import { 
    CHANGE_SEARCH,
    RESET_SEARCH}  from '../actions/types';
const START_STATE = { 
    search: '',
};

export default function SearchReducer (state = START_STATE, action) {
    switch(action.type) {
        case CHANGE_SEARCH:
            return {...state, search: action.payload}; 
        case RESET_SEARCH:
            return {...state, search: ''};                                     
        default:
            return state;
    }
}