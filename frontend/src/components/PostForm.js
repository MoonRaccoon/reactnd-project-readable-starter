import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPost, createPost } from '../actions/index'
import { Link } from 'react-router-dom'

class PostForm extends Component {
  //TODO - PROP VALIDATION

  state = {
    title: "",
    author: "",
    body: "",
    category: "",
  }

  constructor(props) {
    super(props)
    const { id, posts } = this.props
    this.post = posts.find((post) => {return post.id === id})
    this.state = {
      title: (this.isEdit() ? this.post.title : "") ,
      author: (this.isEdit() ? this.post.author : "") ,
      body: (this.isEdit() ? this.post.body : ""),
      category: ""
    }
  }

  isEdit = () => {
    return (typeof this.props.id) !== "undefined"
  }

  updateField = (field, data) => {
    (this.setState((state) => ({
      ...state,
      [field]: data
    })))
  }

  render() {
    const UUID = require('uuid/v4')
    return (
      <div className="postForm">
        <h3>Title</h3>
        <textarea name="paragraph_text"
                  cols="50"
                  rows="1"
                  value={this.state.title}
                  onChange={(event) => (this.updateField("title", event.target.value))}>
        </textarea>

        <h3>Author</h3>
        <textarea name="paragraph_text"
                  cols="50"
                  rows="1"
                  value={this.state.author}
                  onChange={(event) => (this.updateField("author", event.target.value))}>
        </textarea>

        <h3>Body</h3>
        <textarea name="paragraph_text"
                  cols="90"
                  rows="8"
                  value={this.state.body}
                  onChange={(event) => (this.updateField("body", event.target.value))}>
        </textarea>

        <h3>Category</h3>
        <div className="categorySelect">
          <button onClick={() => (this.updateField("category", "react"))}>React</button>
          <button onClick={() => (this.updateField("category", "redux"))}>Redux</button>
          <button onClick={() => (this.updateField("category", "udacity"))}>Udacity</button>
        </div>

        {this.isEdit() ?
          <Link to={"/posts/" + this.post.id}>
            <button onClick={() => (this.props.editPost({
              id: this.post.id,
              title: this.state.title,
              author: this.state.author,
              body: this.state.body,
              category: this.state.category}))}>
              Submit
            </button>
          </Link>
          :
          <Link to="/">
            <button onClick={() => (this.props.createPost({
              id: UUID(), // TODO - CHANGE TO UUID
              title: this.state.title,
              author: this.state.author,
              body: this.state.body,
              category: this.state.category,
              timestamp: Date(Date.now)}))}>
              Create
            </button>
          </Link>
        }
      </div>
    )
  }
}

function mapStateToProps ({ post }) {
  return {
    posts: post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editPost: (data) => dispatch(editPost(data)),
    createPost: (data) => dispatch(createPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)