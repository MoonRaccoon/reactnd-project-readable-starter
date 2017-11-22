import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class PostDetail extends Component {

  // TODO: PROP VALIDATION


  render() {
    return (
      <div className="post">
        <div className="vote">
          <button>Upvote</button>
          <span>{this.props.voteScore}</span>
          <button>Downvote</button>
        </div>
        <div className="content">
          <h3 className="title">{this.props.title}</h3>
          <p>{this.props.body}</p>
          <p className="subtitle">
            posted by {this.props.author} at {this.props.timestamp}
          </p>
        </div>
      </div>
    )
  }
}

export default PostDetail