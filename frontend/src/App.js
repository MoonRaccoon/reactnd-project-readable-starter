import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import PostDetail from './components/PostDetail'
import Root from './components/Root'
import PostForm from './components/PostForm'
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
            return post.id === match.params.id
          })

          return <PostDetail id={matchPost.id}
                             title={matchPost.title}
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
        <Route exact path="/create" render={({ match }) => (
          <PostForm/>
        )}/>
        <Route path="/create/:id" render={({ match }) => (
          <PostForm id={match.params.id}/>
        )}/>
      </div>
    );
  }
}

function mapStateToProps ({ post }) {
  return {
    posts: post
  }
}

export default withRouter(connect(mapStateToProps)(App))
