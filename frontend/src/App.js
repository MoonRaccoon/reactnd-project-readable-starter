import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './components/Post'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Readable</h1>
        <Post></Post>
      </div>
    );
  }
}



export default App;
