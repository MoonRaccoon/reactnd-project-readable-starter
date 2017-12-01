import React, { Component } from 'react';
import { connect } from 'react-redux'
import { commentUpVote, commentDownVote, deleteComment } from '../actions'

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
          <button onClick={() => (commentUpVote(id))} >Upvote</button>
          <span>{voteScore}</span>
          <button onClick={() => (commentDownVote(id))}>Downvote</button>
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
            <button onClick={() => (deleteComment(id))}>Delete</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    commentUpVote: (data) => dispatch(commentUpVote(data)),
    commentDownVote: (data) => dispatch(commentDownVote(data)),
    deleteComment: (data) => dispatch(deleteComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)