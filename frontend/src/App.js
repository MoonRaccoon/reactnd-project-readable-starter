import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { changeCategory } from "./actions/index";
import Post from './components/Post'
import PostDetail from './components/PostDetail'
import Root from './components/Root'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class App extends Component {

  //TODO - refactor post id matching (2nd route render function)

  render() {
    return (
      <div className="App">
       <Link to="/">
          <h1>Readable</h1>
       </Link>
        <Route exact path="/" render={() => (
          <Root/>
        )}/>
        <Route path="/posts/:id" render={({ match }) => {
          const matchPost = this.props.posts.find((post) => {
            return post.id === parseInt(match.params.id)
          })

          return <PostDetail title={matchPost.title}
                             voteScore={matchPost.voteScore}
                             timestamp={matchPost.timestamp}
                             body={matchPost.body}
                             author={matchPost.author}/>
          //.map((post) => (
          //  <Post key={post.id}
          //        title={post.title}
          //        voteScore={post.voteScore}
          //        timestamp={post.timestamp}
          //       author={post.author}
          //  />
          //))
        }}/>
        <Route path="/create" render={() => (
          <span>Post Creation Page</span>
        )}/>
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

export default withRouter(connect(mapStateToProps)(App))
