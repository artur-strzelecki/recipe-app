import {
    HOME_DATA,
    LOADED_HOME,
    LIST_DATA,
    LIST_LOADED,
    FAV_DATA,
    FAV_LOADED,
    } from '../actions/typesData';

const START_STATE = { 
    dataHome: [],
    dataList: [],
    dataFav: [],
    loadedList: false,
    loadedHome: false,
    loadedFav: false,
};

export default function DataReducer (state = START_STATE, action) {
    switch(action.type) {
        case HOME_DATA:
            return {...state, dataHome: action.payload, loadedHome: true};    
        case LOADED_HOME:
            return {...state, loadedHome: false};  
        case LIST_DATA:
            return {...state, dataList: action.payload, loadedList: true};    
        case LIST_LOADED:
            return {...state, loadedList: false}; 
        case FAV_DATA:
            return {...state, dataFav: action.payload, loadedFav: true};    
        case FAV_LOADED:
            return {...state, loadedFav: false};                                                                            
        default:
            return state;
    }
}