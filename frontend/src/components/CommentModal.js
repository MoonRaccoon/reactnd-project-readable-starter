import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { newComment, updateComment } from '../actions/index'

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

  createFormFilled = () => {
    const UUID = require('uuid/v4')
    if (this.state.author !== "" && this.state.body !== "") {
      return <button onClick={() => {
        newComment(
          this.props.dispatch,
          UUID(), Date.now(),
          this.state.body,
          this.state.author,
          this.props.parentId)
        this.props.updateField("isCommentModalOpen", false)
        this.clearForm()}}>Submit</button>
    }
    return <p>Please fill out all fields to continue</p>
  }

  editFormFilled = () => {
    if (this.state.body !== "") {
      return <button onClick={() => {
        updateComment(this.props.dispatch, this.comment.id, Date.now(), this.state.body)
        this.props.updateField("isEditModalOpen", false)
        this.clearForm()}}>Submit</button>
    }
    return <p>Please fill out all fields to continue</p>
  }

  render() {
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
                this.editFormFilled()
              :
                this.createFormFilled()
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


export default connect(mapStateToProps)(CommentModal)