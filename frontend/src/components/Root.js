import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeSortOrder } from "../actions/index";
import Post from '../components/Post'
import { Link } from 'react-router-dom'
import { fetchPosts } from '../actions/index'

class Root extends Component {

  // TODO: PROP VALIDATION

  componentWillMount() {
    fetchPosts(this.props.dispatch)
  }

  listPosts = () => {
    return (
      this.props.posts
        .filter((post) => {
          if (post.deleted) {
            return false
          }
          if (this.props.category === '') {
            return true
          }
          return post.category === this.props.category})
        .sort((() => {
          if (this.props.sortOrder === 'voteScore') {
            return this.props.compareVoteScore
          }
          else if (this.props.sortOrder === 'timestamp') {
            return this.props.compareTimestamp
          }
        })())
        .map((post) => (
            <li key={post.id}>
              <Post id={post.id}
                    title={post.title}
                    voteScore={post.voteScore}
                    timestamp={post.timestamp}
                    author={post.author}
                    category={post.category}
                    commentCount={post.commentCount}
                    getDate={this.props.getDate}
              />
            </li>
          )
        )
    )
  }

  render() {
    return (
      <div>
        <Link to={"/"}>
          <button>All</button>
        </Link>
        <Link to={"/react"}>
          <button>React</button>
        </Link>
        <Link to={"/redux"}>
          <button>Redux</button>
        </Link>
        <Link to={"/udacity"}>
          <button>Udacity</button>
        </Link>
        <div>
          <select value={this.props.sortOrder}
                  onChange={(event) => {this.props.dispatch(changeSortOrder(event.target.value))}}>
            <option value="none" disabled>Order by...</option>
            <option value="voteScore">Vote</option>
            <option value="timestamp">Timestamp</option>
          </select>
          <Link to="/create" >
            <button className="createPost">Create Post</button>
          </Link>
        </div>
        {this.listPosts()}
      </div>
    );
  }
}



function mapStateToProps ({ post, sortOrder }) {
  return {
    posts: post,
    sortOrder: sortOrder
  }
}

export default connect(mapStateToProps)(Root)