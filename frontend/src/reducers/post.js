import {
  UP_VOTE, DOWN_VOTE, EDIT_POST, DELETE_POST,
  CREATE_POST, GET_POSTS } from "../actions/actionTypes";

export default function post (state = [], action) {
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
