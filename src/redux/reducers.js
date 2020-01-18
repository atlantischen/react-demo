/**
 * 用来根据prevState和action生成newState函数模块
 */
import { combineReducers } from 'redux';
import {
  SAVE_USER,
  REMOVE_USER,
  CHANGE_LANGUAGE,
  GET_CATEGORY_LIST,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from './action-types';
import { getItem } from '../utils/storage';

const initUser = getItem('user') || {};
function user(prevState = initUser, action) {
  switch (action.type) {
    case SAVE_USER:
      return action.data;
    case REMOVE_USER:
      return {};
    default:
      return prevState;
  }
}

const initLanguage = navigator.language || navigator.languages[0] || 'zh-CN';
function language(prevState = initLanguage, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return action.data;
    default:
      return prevState;
  }
}

const initCategories = [];
function categories(prevState = initCategories, action) {
  
  switch (action.type) {
    case GET_CATEGORY_LIST:
      return action.data;
    case ADD_CATEGORY:
      return [...prevState, action.data];
      case UPDATE_CATEGORY:
      return prevState.map(category=>{
        if(category._id === action.data._id){
          return action.data
        }
        return category
      }) ;
      case DELETE_CATEGORY:
        return prevState.filter(category=>category._id !== action.data)
    default:
      return prevState;
  }
}
export default combineReducers({
  user,
  language,
  categories
});
