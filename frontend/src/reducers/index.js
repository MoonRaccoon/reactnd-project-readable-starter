import { combineReducers } from 'redux'

const initialPostState = [
  {
    id: 1,
    voteScore: 666,
    title: "I promise this isn't a reddit clone"
  } ,
  {
    id: 2,
    voteScore: 711,
    title: "Conspiracy theories CUNIFREMD"
  }
]


function post (state = initialPostState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default post