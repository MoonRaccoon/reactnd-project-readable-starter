import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import PostDetail from './components/PostDetail'
import Root from './components/Root'
import PostForm from './components/PostForm'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Link, Switch } from 'react-router-dom'
import { fetchPosts } from './actions/index'

class App extends Component {

  //TODO - refactor post id matching (2nd route render function)

  getDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toDateString() + " " + date.toTimeString()
  }

  compareVoteScore = (a, b) => {
    if (a.voteScore > b.voteScore) {
      return -1;
    }
    if (a.voteScore < b.voteScore) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  compareTimestamp = (a, b) => {
    if (a.timestamp > b.timestamp) {
      return -1;
    }
    if (a.timestamp < b.timestamp) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  render() {
    return (
      <div className="App">
       <Link to="/">
          <h1>Readable</h1>
       </Link>
        <Switch>
          <Route exact path="/" render={() => (
            <Root getDate={this.getDate}
                  compareVoteScore={this.compareVoteScore}
                  compareTimestamp={this.compareTimestamp}
                  category={''}/>
          )}/>
          <Route exact path="/create" render={({ match }) => (
            <PostForm/>
          )}/>
          <Route path="/create/:id" render={({ match }) => (
            <PostForm id={match.params.id}/>
          )}/>
          <Route exact path="/:category" render={({ match }) => (
            <Root getDate={this.getDate}
                  compareVoteScore={this.compareVoteScore}
                  compareTimestamp={this.compareTimestamp}
                  category={match.params.category}/>
          )}/>
          <Route path="/:category/:id" render={({ match }) => {
            const matchPost = this.props.posts.find((post) => {
              return post.id === match.params.id
            })

            return <PostDetail id={matchPost.id}
                               title={matchPost.title}
                               voteScore={matchPost.voteScore}
                               timestamp={matchPost.timestamp}
                               body={matchPost.body}
                               author={matchPost.author}
                               getDate={this.getDate}
                               compareVoteScore={this.compareVoteScore}/>
          }}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps ({ post }) {
  return {
    posts: post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (data) => dispatch(fetchPosts(data))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
