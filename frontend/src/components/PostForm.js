import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePost, newPost } from '../actions/index'
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

  createFormFilled = () => {
    if (this.state.title !== "" &&
        this.state.author !== "" &&
        this.state.body !== "" &&
        this.state.category !== "") {
      return true
    }
    return false
  }

  editFormFilled = () => {
    if (this.state.title !== "" && this.state.body !== "") {
      return true
    }
    return false
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

        {this.isEdit() ?
          <div className="postForm">
            <h3>Body</h3>
            <textarea name="paragraph_text"
                      cols="90"
                      rows="8"
                      value={this.state.body}
                      onChange={(event) => (this.updateField("body", event.target.value))}>
            </textarea>
            {this.editFormFilled() ?
              <div className="postForm">
                <Link to={"/" + this.post.category + "/" + this.post.id}>
                  <button onClick={() => {
                    updatePost(this.props.dispatch, this.post, this.state.title, this.state.body)}}>
                    Submit
                  </button>
                  <button>Cancel</button>
                </Link>
              </div>
              :
              <p className="formIncomplete">Please fill out all fields to continue</p>
            }
          </div>
          :
          <div className="createFlow">
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
            {this.createFormFilled() ?
              <Link to="/">
                <button onClick={() => {
                  newPost(
                    this.props.dispatch,
                    UUID(),
                    Date.now(),
                    this.state.title,
                    this.state.body,
                    this.state.author,
                    this.state.category)}}>
                  Create
                </button>
              </Link>
              :
              <p className="formIncomplete">Please fill out all fields and select a category to continue</p>
            }
          </div>
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

export default connect(mapStateToProps)(PostForm)