import React, { Component } from 'react';
import { upVote, downVote } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
class PostDetail extends Component {

  // TODO: PROP VALIDATION

  state = {
    isCommentModalOpen: false
  }

  updateField = (field, data) => {
    (this.setState((state) => ({
      ...state,
      [field]: data
    })))
  }

  render() {
    const {id, title, body, author, timestamp, voteScore, upVote, downVote} = this.props

    this.getDate = () => {
      const date = new Date(timestamp)
      return date.toDateString() + " " + date.toTimeString()
    }

    return (
     <div>
        <div className="post">
          <div className="vote">
            <button onClick={() => (upVote(id))} >Upvote</button>
            <span>{voteScore}</span>
            <button onClick={() => (downVote(id))}>Downvote</button>
          </div>
          <div className="content">
            <h3 className="title">{title}</h3>
            <p className="display-linebreak">{body}</p>
            <p className="subtitle">
              posted by {author} at {this.getDate()}
            </p>
            <div className="postControl">
              <Link to={'/create/' + id}>
                <button>Edit</button>
              </Link>
              <button>Delete</button>
            </div>
          </div>
        </div>

       <Modal
         className='modal'
         overlayClassName='overlay'
         isOpen={this.state.isCommentModalOpen}
         contentLabel='Modal'
       >
         <div className="commentForm">
           <h3>comment on this post</h3>
           <h5>author</h5>
           <div className="commentBox">
             <textarea cols="50"
                       rows="1">
             </textarea>
               <h5>body</h5>
               <textarea cols="50"
                         rows="6">
             </textarea>
             <div className="modalButtons">
               <button>Submit</button>
               <button onClick={() => {this.updateField("isCommentModalOpen", false)}}>Cancel</button>
             </div>
           </div>
         </div>
       </Modal>
       <div className="commentsTop">
         <span>{"this post has 0 comments"}</span>
         <button onClick={() => (this.updateField("isCommentModalOpen", true))}>write a comment</button>
       </div>
       {/*<div className="comments">
         <div className="comment">
           <div className="vote">
             <button onClick={() => (upVote(id))} >Upvote</button>
             <span>{voteScore}</span>
             <button onClick={() => (downVote(id))}>Downvote</button>
           </div>
           <div className="content">
             <span className="title">{title}</span>
             <p className="subtitle">
               posted by {author} at {timestamp}
             </p>
             <Link to={"/posts/" + id}>
               <button>Detail</button>
             </Link>
           </div>
         </div>
       </div>*/}
     </div>
      )
    }
  }

  function mapStateToProps () {
    return {}
  }

function mapDispatchToProps (dispatch) {
  return {
    upVote: (data) => dispatch(upVote(data)),
    downVote: (data) => dispatch(downVote(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)