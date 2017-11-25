import React, { Component } from 'react';
import { connect } from 'react-redux'
import { upVote, downVote } from '../actions'
import { Link } from 'react-router-dom'

class Comment extends Component {

  // TODO: PROP VALIDATION


  render() {
    const {id, parentID, body, author, timestamp, voteScore, upVote, downVote} = this.props

    return (
      <div className="post">
        <div className="vote">
          <button onClick={() => (upVote(id))} >Upvote</button>
          <span>{voteScore}</span>
          <button onClick={() => (downVote(id))}>Downvote</button>
        </div>
        <div className="content">
          <span className="title">{title}</span>
          <p className="subtitle">
            posted by {author} at {timestamp}
          </p>
          <Link to={"/posts/" + id}>
            <button>Detail</button>
          </Link>
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
    upVote: (data) => dispatch(upVote(data)),
    downVote: (data) => dispatch(downVote(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)