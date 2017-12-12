import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import PostDetail from './components/PostDetail'
import Root from './components/Root'
import PostForm from './components/PostForm'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Link, Switch } from 'react-router-dom'

class App extends Component {

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

            if (typeof matchPost !== "undefined") {
              return <PostDetail id={matchPost.id}
                                 title={matchPost.title}
                                 voteScore={matchPost.voteScore}
                                 timestamp={matchPost.timestamp}
                                 body={matchPost.body}
                                 author={matchPost.author}
                                 getDate={this.getDate}
                                 compareVoteScore={this.compareVoteScore}/>
            }

            return <h3>{"No post found with requested ID: " + match.params.id}</h3>
          }}/>
         <Route render={({ location }) => {
           <div>
             <h3>{"No page found for requested URL: " + location}</h3>
           </div>
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

export default withRouter(connect(mapStateToProps)(App))
