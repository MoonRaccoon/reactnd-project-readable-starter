import "../actions/actionTypes"
import { CHANGE_SORT_ORDER } from '../actions/actionTypes'

const initialSortOrderState = 'voteScore'

export default function sortOrder (state = initialSortOrderState, action) {
  const { sortOrder } = action

  switch (action.type) {
    case CHANGE_SORT_ORDER:
      return sortOrder
    default:
      return state
  }
}