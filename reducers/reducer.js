import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import LoginReducer from './LoginReducer';
import SearchReducer from './SearchReducer';
import AddRecipeReducer from './AddRecipeReducer';
import FavReducer from './FavReducer';
import DataReducer from './DataReducer';

export default combineReducers({
 AuthReducer,LoginReducer,SearchReducer,AddRecipeReducer,FavReducer,DataReducer
});
