import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import {editComment, createComment } from '../actions/index'

class CommentModal extends Component {

  // TODO - PROP VALIDATION

  state = {
    author: "",
    body: ""
  }


  constructor(props) {
    super(props)
    const {id, comments} = this.props
    this.comment = comments.find((comment) => { return comment.id === id })
    this.state = {
      author: "",
      body: (this.isEdit() ? this.comment.body : "")
    }
  }
  isEdit = () => {
    return (typeof this.props.id) !== "undefined"
  }

  updateCommentField = (field, data) => {
    (this.setState((state) => ({
      ...state,
      [field]: data
    })))
  }

  clearForm = () => {
    this.setState({
      author: "",
      body: ""
    })
  }

  render() {
    const UUID = require('uuid/v4')

    return (
      <Modal
        className='modal'
        overlayClassName='overlay'
        isOpen={this.props.isCommentModalOpen || this.props.isEditModalOpen}
        contentLabel='Modal'
      >
        <div className="commentForm">
          <h3>comment on this post</h3>
          <div className="commentBox">
            {!this.isEdit() &&
              <div>
                <h5>author</h5>
                <textarea cols="50"
                          rows="1"
                          value={this.state.author}
                          onChange={(event) => {this.updateCommentField("author", event.target.value)}}>
               </textarea>
              </div>
            }
            <h5>body</h5>
            <textarea cols="50"
                      rows="6"
                      value={this.state.body}
                      onChange={(event) => {this.updateCommentField("body", event.target.value)}}>
             </textarea>
            <div className="modalButtons">
              {this.isEdit() ?
                <button onClick={() => {
                  this.props.editComment({
                    id: this.comment.id, // TODO - CHANGE TO UUID
                    body: this.state.body,
                    timestamp: Date.now()})
                  this.props.updateField("isEditModalOpen", false)
                  this.clearForm()}}>Submit</button>
              :
                <button onClick={() => {
                  this.props.createComment({
                    id: UUID(), // TODO - CHANGE TO UUID
                    parentId: this.props.parentId,
                    body: this.state.body,
                    author: this.state.author,
                    timestamp: Date.now()})
                  this.props.updateField("isCommentModalOpen", false)
                  this.clearForm()}}>Submit</button>
              }

              {this.props.isEditModalOpen ?
                <button onClick={() => {
                  this.props.updateField("isEditModalOpen", false)
                  this.clearForm()}}>Cancel</button>
                :
                <button onClick={() => {
                  this.props.updateField("isCommentModalOpen", false)
                  this.clearForm()}}>Cancel</button>}
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

function mapStateToProps ({ comment, commentToEdit }) {

  return {
    comments: comment,
    commentToEdit: commentToEdit
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editComment: (data) => dispatch(editComment(data)),
    createComment: (data) => dispatch(createComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentModal)