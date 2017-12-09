import React, { Component } from 'react';
import { upVotePost, downVotePost, deletePost, deleteParent, postDelete } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import CommentModal from "./CommentModal";

class PostDetail extends Component {

  // TODO: PROP VALIDATION

  state = {
    isCommentModalOpen: false,
    isEditModalOpen: false,
    commentToEdit: ""
  }

  updateField = (field, data) => {
    (this.setState((state) => ({
      ...state,
      [field]: data
    })))
  }

  filterComments = () => {
    const { comments } = this.props
    return comments.filter((comment) => {
      if (comment.deleted) {
        return false
      }
      else if (comment.parentId === this.props.id) {
        return true
      }
    }).sort(this.props.compareVoteScore)
  }

  listComments = () => {
    return (
      this.filterComments()
        .map((comment) => (
            <li key={comment.id}>
              <Comment id={comment.id}
                       parentId={this.props.id}
                       voteScore={comment.voteScore}
                       timestamp={comment.timestamp}
                       body={comment.body}
                       author={comment.author}
                       updateField={this.updateField}
              />
            </li>
          )
        )
    )
  }

  render() {
    const {id, title, body, author, timestamp, voteScore, upVote, downVote, deletePost } = this.props

    const commentString = "this post has " + this.filterComments().length + " comment"

    return (
     <div>
        <div className="post">
          <div className="vote">
            <button onClick={() => (upVotePost(this.props.dispatch, id))} >Upvote</button>
            <span>{voteScore}</span>
            <button onClick={() => (downVotePost(this.props.dispatch, id))}>Downvote</button>
          </div>
          <div className="content">
            <h3 className="title">{title}</h3>
            <p className="display-linebreak">{body}</p>
            <p className="subtitle">
              posted by {author} on {this.props.getDate(timestamp)}
            </p>
            <div className="postControl">
              <Link to={'/create/' + id}>
                <button>Edit</button>
              </Link>
              <Link to='/'>
                <button onClick={() => {
                  postDelete(this.props.dispatch, id)
                  this.filterComments().forEach((comment) => (this.props.dispatch(deleteParent(comment.id))))}}>Delete</button>
              </Link>
            </div>
          </div>
        </div>
       <CommentModal isCommentModalOpen={this.state.isCommentModalOpen}
                     updateField={this.updateField}
                     parentId={id}/>
       {this.state.isEditModalOpen && <CommentModal isEditModalOpen={this.state.isEditModalOpen}
                                                    updateField={this.updateField}
                                                    parentId={this.props.id}
                                                    id={this.state.commentToEdit}/>}
       <div className="commentsTop">
         <span>{this.filterComments().length !== 1 ? commentString + "s" : commentString}</span>
         <button onClick={() => (this.updateField("isCommentModalOpen", true))}>write a comment</button>
       </div>
       <div className="comments">
         {this.listComments()}
       </div>
     </div>
    )
  }
}


function mapStateToProps ({ comment }) {
  return {
    comments: comment
  }
}


export default connect(mapStateToProps)(PostDetail)