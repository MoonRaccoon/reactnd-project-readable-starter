import { combineReducers } from 'redux'
import post from './post'
import sortOrder from './sortOrder'
import comment from './comment'

export default combineReducers({
  post,
  comment,
  sortOrder
})