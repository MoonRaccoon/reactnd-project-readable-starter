import { combineReducers } from 'redux'

const initialPostState = {
  voteScore: 666,
  title: "I promise this isn't a reddit clone"
}

function post (state = initialPostState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default post