import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import Post from './components/Post'

class App extends Component {

  // TODO: PROP VALIDATION

  listPosts = (post) => {
    return (
      this.props.posts.map((post) => (
        <li key={post.id}>
          <Post title={post.title}
                voteScore={post.voteScore}
          />
        </li>
        )
      )
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Readable</h1>
        {this.listPosts()}
      </div>
    );
  }
}



function mapStateToProps (post) {
  return { posts: post }
}

export default connect(mapStateToProps)(App)
