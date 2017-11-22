import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Post extends Component {

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
          <span className="title">{this.props.title}</span>
          <p className="subtitle">
            posted by {this.props.author} at {this.props.timestamp}
          </p>
          <Link to={"/posts/" + this.props.id}>
            <button>Detail</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Post