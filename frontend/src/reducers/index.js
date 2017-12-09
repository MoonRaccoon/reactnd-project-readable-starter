import { combineReducers } from 'redux'
import {
  UP_VOTE, DOWN_VOTE, EDIT_POST, DELETE_POST,
  CREATE_POST, CREATE_COMMENT, COMMENT_UP_VOTE, COMMENT_DOWN_VOTE,
  CHANGE_SORT_ORDER, EDIT_COMMENT, DELETE_COMMENT,
  DELETE_PARENT, GET_POSTS, GET_COMMENTS} from "../actions/index";

const initialSortOrderState = 'voteScore'

function post (state = [], action) {
  const { id, title, author, body, category, timestamp } = action
  const findPostIndex = (state) => {
    return state.findIndex((post) => (post.id === id))
  }

  switch (action.type) {
    case GET_POSTS:
      return action.posts
    case UP_VOTE:
      return (() => {
        let newState = [...state]
        newState[findPostIndex(newState)].voteScore++
        return newState
      })()
    case DOWN_VOTE:
      return (() => {
        let newState = [...state]
        newState[findPostIndex(newState)].voteScore--
        return newState
      })()
    case EDIT_POST:
      return (() => {
        let newState = [...state]
        newState[findPostIndex(newState)].title = title
        newState[findPostIndex(newState)].body = body
        return newState
      })()
    case CREATE_POST:
      return [
        ...state,
        {
          id: id,
          voteScore: 1,
          timestamp: timestamp,
          title: title,
          body: body,
          author: author,
          category: category,
          deleted: false
        }
      ]
    case DELETE_POST:
      return (() => {
        let newState = [...state]
        newState[findPostIndex(newState)].deleted = true
        return newState
      })()
    default:
      return state
  }
}

function sortOrder (state = initialSortOrderState, action) {
  const { sortOrder } = action

  switch (action.type) {
    case CHANGE_SORT_ORDER:
      return sortOrder
    default:
      return state
  }
}

function comment (state = [], action) {
  const { id, parentId, author, body, timestamp } = action
  const findCommentIndex = (state) => {
    return state.findIndex((comment) => (comment.id === id))
  }
  switch  (action.type) {
    case GET_COMMENTS:
      return action.comments
    case CREATE_COMMENT:
      return [
        ...state,
        {
          id: id,
          parentId: parentId,
          voteScore: 1,
          timestamp: timestamp,
          body: body,
          author: author,
          deleted: false,
          parentDeleted: false
        }
      ]
    case EDIT_COMMENT:
      return (() => {
        let newState = [...state]
        newState[findCommentIndex(newState)].body = body
        newState[findCommentIndex(newState)].timestamp = timestamp
        return newState
      })()
    case DELETE_COMMENT:
      return (() => {
        let newState = [...state]
        newState[findCommentIndex(newState)].deleted = true
        return newState
      })()
    case DELETE_PARENT:
      return (() => {
        let newState = [...state]
        newState[findCommentIndex(newState)].parentDeleted = true
        return newState
      })()
    case COMMENT_UP_VOTE:
      return (() => {
        let newState = [...state]
        newState[findCommentIndex(newState)].voteScore++
        return newState
      })()
    case COMMENT_DOWN_VOTE:
      return (() => {
        let newState = [...state]
        newState[findCommentIndex(newState)].voteScore--
        return newState
      })()
    default:
      return state
  }
}

export default combineReducers({
  post,
  comment,
  sortOrder
})