import {
  CREATE_COMMENT, COMMENT_UP_VOTE, COMMENT_DOWN_VOTE,
  EDIT_COMMENT, DELETE_COMMENT, DELETE_PARENT, GET_COMMENTS} from "../actions/actionTypes";

export default function comment (state = [], action) {
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