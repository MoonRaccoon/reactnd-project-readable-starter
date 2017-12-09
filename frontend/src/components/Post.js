import React, { Component } from 'react';
import { connect } from 'react-redux'
import { upVotePost, downVotePost } from '../actions'
import { Link } from 'react-router-dom'

class Post extends Component {

  // TODO: PROP VALIDATION


  render() {
    const {id, title, author, category, timestamp, getDate, voteScore } = this.props

      return (
      <div className="post">
        <div className="vote">
          <button onClick={() => (upVotePost(this.props.dispatch, id))} >Upvote</button>
          <span>{voteScore}</span>
          <button onClick={() => (downVotePost(this.props.dispatch, id))}>Downvote</button>
        </div>
        <div className="content">
          <span className="title">{title}</span>
          <p className="subtitle">
            posted by {author} on {getDate(timestamp)}
          </p>
          <Link to={"/" + category +  "/" + id}>
            <button>Detail</button>
          </Link>
        </div>
      </div>
    )
  }
}


export default connect()(Post)