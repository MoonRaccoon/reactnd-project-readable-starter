import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeCategory } from "../actions/index";
import Post from '../components/Post'
import { Link } from 'react-router-dom'

class Root extends Component {

  // TODO: PROP VALIDATION

  listPosts = () => {
    return (
      this.props.posts
        .filter((post) => {
          if (this.props.category === 'all') {
            return true
          }
          return post.category === this.props.category})
        .map((post) => (
            <li key={post.id}>
              <Post id={post.id}
                    title={post.title}
                    voteScore={post.voteScore}
                    timestamp={post.timestamp}
                    author={post.author}
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
          <Link to="/create" >
            <button className="createPost">Create Post</button>
          </Link>
        </div>
        {this.listPosts()}
      </div>
    );
  }
}



function mapStateToProps ({ post, category }) {
  return {
    posts: post,
    category: category
  }
}

function mapDispatchToProps (dispatch) {
  return {
    changeCategory: (data) => dispatch(changeCategory(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)