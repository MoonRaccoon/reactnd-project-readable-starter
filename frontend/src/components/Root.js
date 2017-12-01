import React, { Component } from 'react';
import { connect } from 'react-redux'
import {changeCategory, changeSortOrder} from "../actions/index";
import Post from '../components/Post'
import { Link } from 'react-router-dom'

class Root extends Component {

  // TODO: PROP VALIDATION

  listPosts = () => {
    return (
      this.props.posts
        .filter((post) => {
          if (post.deleted) {
            return false
          }
          if (this.props.category === 'all') {
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
        <button onClick={() => (this.props.changeCategory('all'))}>All</button>
        <button onClick={() => (this.props.changeCategory('react'))}>React</button>
        <button onClick={() => (this.props.changeCategory('redux'))}>Redux</button>
        <button onClick={() => (this.props.changeCategory('udacity'))}>Udacity</button>
        <div>
          <select value={this.props.sortOrder} onChange={(event) => {this.props.changeSortOrder(event.target.value)}}>
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



function mapStateToProps ({ post, category, sortOrder }) {
  return {
    posts: post,
    category: category,
    sortOrder: sortOrder
  }
}

function mapDispatchToProps (dispatch) {
  return {
    changeCategory: (data) => dispatch(changeCategory(data)),
    changeSortOrder: (data) => dispatch(changeSortOrder(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)