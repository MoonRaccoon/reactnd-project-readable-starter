export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const CREATE_POST = 'CREATE_POST'


export function changeCategory (category) {
  return {
    type: CHANGE_CATEGORY,
    category
  }
}

export function upVote (id) {
  return {
    type: UP_VOTE,
    id
  }
}

export function downVote (id) {
  return {
    type: DOWN_VOTE,
    id
  }
}

export function editPost ({ id, title, author, body, category }) {
  return {
    type: EDIT_POST,
    id,
    title,
    author,
    body,
    category
  }
}

export function createPost ({ id, title, author, body, category, timestamp }) {
  return {
    type: CREATE_POST,
    id,
    title,
    author,
    body,
    category,
    timestamp
  }
}

export function deletePost (id) {
  return  {
    type: DELETE_POST,
    id
  }
}