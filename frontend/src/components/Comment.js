import React, { Component } from 'react';
import { connect } from 'react-redux'
import { commentUpVote, commentDownVote, deleteComment, commentDelete, upVoteComment, downVoteComment } from '../actions'

class Comment extends Component {

  // TODO: PROP VALIDATION

  render() {
    const {id, parentId, body, author, timestamp, voteScore, commentUpVote, commentDownVote, deleteComment} = this.props

    function getDate() {
      const date = new Date(timestamp)
      return date.toDateString() + " " + date.toTimeString()
    }

    return (
      <div className="comment">
        <div className="vote">
          <button onClick={() => (upVoteComment(this.props.dispatch, id))} >Upvote</button>
          <span>{voteScore}</span>
          <button onClick={() => (downVoteComment(this.props.dispatch, id))}>Downvote</button>
        </div>
        <div className="content">
          <span className="subtitle">
            {author} says:
          </span>
          <p className="display-linebreak">{body}</p>
          <p className="subtitle">
            posted on {getDate()}
          </p>
          <div className="postControl">
            <button onClick={() => {
              this.props.updateField("isEditModalOpen", true)
              this.props.updateField('commentToEdit', id)
            }}>Edit</button>
            <button onClick={() => (commentDelete(this.props.dispatch, id))}>Delete</button>
          </div>
        </div>
      </div>
    )
  }
}


export default connect()(Comment)