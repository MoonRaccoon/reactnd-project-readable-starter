import React, { Component } from 'react';
import { connect } from 'react-redux'

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
          <p></p>
          <button>Detail</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps (post) {
  return post
}

export default connect(mapStateToProps)(Post)