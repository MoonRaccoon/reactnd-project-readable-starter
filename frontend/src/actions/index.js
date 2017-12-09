import * as ReadableAPI from '../ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const CREATE_POST = 'CREATE_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_PARENT = 'DELETE_PARENT'
export const COMMENT_UP_VOTE = 'COMMENT_UP_VOTE'
export const COMMENT_DOWN_VOTE = 'COMMENT_DOWN_VOTE'
export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER'
export const LOAD_COMMENT_ID = 'LOAD_COMMENT_ID'

export const getPosts = posts => ({
    type: GET_POSTS,
    posts
})

export const fetchPosts = () => (dispatch) => (
  ReadableAPI
    .posts()
    .then(posts => dispatch(getPosts(posts)))
    .then(posts => console.log(posts))
);

export function changeCategory (category) {
  return {
    type: CHANGE_CATEGORY,
    category
  }
}

export function changeSortOrder (sortOrder) {
  return {
    type: CHANGE_SORT_ORDER,
    sortOrder
  }
}

export function loadCommentId (id) {
  return {
    type: LOAD_COMMENT_ID,
    id
  }
}

export function upVote (id) {
  return {
    type: UP_VOTE,
    id
  }
}

export function upVotePost (dispatch, id) {
  ReadableAPI
    .votePost(id, "upVote")
    .then(dispatch(upVote(id)))
}

export function downVotePost (dispatch, id) {
  ReadableAPI
    .votePost(id, "downVote")
    .then(dispatch(downVote(id)))
}



export function downVote (id) {
  return {
    type: DOWN_VOTE,
    id
  }
}

export function commentUpVote (id) {
  return {
    type: COMMENT_UP_VOTE,
    id
  }
}

export function commentDownVote (id) {
  return {
    type: COMMENT_DOWN_VOTE,
    id
  }
}

export function updatePost (dispatch, post, title, body) {
  ReadableAPI
    .updatePost(post, title, body)
    .then(dispatch(editPost({ id: post.id, title, body })))
}

export function editPost ({ id, title, body }) {
  return {
    type: EDIT_POST,
    id,
    title,
    body
  }
}

export function newPost (dispatch, id, timestamp, title, body, author, category) {
  ReadableAPI
    .newPost(id, timestamp, title, body, author, category)
    .then(dispatch(createPost({
      id: id,// TODO - CHANGE TO UUID
      title: title,
      author: author,
      body: body,
      category: category,
      timestamp: timestamp})))
}

export function createPost ({ id, title, author, body, category, timestamp }) {
  return {
    type: CREATE_POST,
    id,
    title,
    body,
    author,
    category,
    timestamp
  }
}

export function editComment ({ id, timestamp, body }) {
  return {
    type: EDIT_COMMENT,
    id,
    timestamp,
    body
  }
}

export function createComment ({ id, parentId, author, body, timestamp }) {
  return {
    type: CREATE_COMMENT,
    id,
    parentId,
    body,
    author,
    timestamp
  }
}

export function deleteComment (id) {
  return  {
    type: DELETE_COMMENT,
    id
  }
}

export function deleteParent (id) {
  return  {
    type: DELETE_PARENT,
    id
  }
}

export function deletePost (id) {
  return  {
    type: DELETE_POST,
    id
  }
}

export function postDelete (dispatch, id) {
  ReadableAPI
    .postDelete(id)
    .then(dispatch(deletePost(id)))
}
