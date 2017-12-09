import * as ReadableAPI from '../ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
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
export const GET_COMMENTS = 'GET_COMMENTS'


export const getPosts = posts => ({
    type: GET_POSTS,
    posts
})

export const fetchPosts = () => (dispatch) => (
  ReadableAPI
    .posts()
    .then(posts => dispatch(getPosts(posts)))
);

export function changeSortOrder (sortOrder) {
  return {
    type: CHANGE_SORT_ORDER,
    sortOrder
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

export function upVoteComment (dispatch, id) {
  ReadableAPI
    .voteComment(id, "upVote")
    .then(dispatch(commentUpVote(id)))
}

export function downVoteComment (dispatch, id) {
  ReadableAPI
    .voteComment(id, "downVote")
    .then(dispatch(commentDownVote(id)))
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

export const getComments = comments => ({
  type: GET_COMMENTS,
  comments
})

export function fetchComments (dispatch, postId) {
  ReadableAPI
    .comments(postId)
    .then(comments => dispatch(getComments(comments)))
}

export function updateComment (dispatch, id, timestamp, body) {
  ReadableAPI
    .updateComment(id, timestamp, body)
    .then(dispatch(editComment({ id, timestamp, body })))
}

export function editComment ({ id, timestamp, body }) {
  return {
    type: EDIT_COMMENT,
    id,
    timestamp,
    body
  }
}

export function newComment (dispatch, id, timestamp, body, author, parentId) {
  ReadableAPI
    .newComment(id, timestamp, body, author, parentId)
    .then(dispatch(createComment({
      id: id,// TODO - CHANGE TO UUID
      parentId: parentId,
      author: author,
      body: body,
      timestamp: timestamp})))
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

export function commentDelete (dispatch, id) {
  ReadableAPI
    .commentDelete(id)
    .then(dispatch(deleteComment(id)))
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
