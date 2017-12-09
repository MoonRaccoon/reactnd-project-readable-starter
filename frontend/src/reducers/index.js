import { combineReducers } from 'redux'
import {
  CHANGE_CATEGORY, UP_VOTE, DOWN_VOTE, EDIT_POST, DELETE_POST,
  CREATE_POST, CREATE_COMMENT, COMMENT_UP_VOTE, COMMENT_DOWN_VOTE,
  CHANGE_SORT_ORDER, LOAD_COMMENT_ID, EDIT_COMMENT, DELETE_COMMENT,
  DELETE_PARENT, GET_POSTS, GET_COMMENTS} from "../actions/index";

const initialSortOrderState = 'voteScore'

const initialCategoryState = 'all'

const initialPostState = [
  {
    id: "1",
    voteScore: 666,
    timestamp: 290000000,
    title: "I promise this isn't a reddit clone",
    body: "Lorem ipsum dolor sit amet, no mea latine efficiantur, eos fierent scriptorem ea, eos brute facer" +
    " torquatos te. Justo quando cu vim. Cu prima interesset duo, per at dolores omittam abhorreant, no scripta" +
    " delenit ceteros nec. Duo ut summo graeci gloriatur. Docendi senserit voluptatum pri ei, interesset " +
    "delicatissimi sed ut. Te nam aperiam fabellas. Est et tale elaboraret. Ea mei molestiae forensibus " +
    "dissentiunt, laudem omnesque invenire cu pro. Debitis nostrum mediocritatem ut mei, nostro apeirian" +
    " usu id. Minimum corrumpit eu eam. Eu graeci delenit expetendis cum, mel eu alii case mucius. Eu libris" +
    " eirmod corrumpit eos.",
    author: "Satin",
    category: "react",
    deleted: false
  } ,
  {
    id: "2",
    voteScore: 711,
    timestamp: 210000000,
    title: "Conspiracy theories CUNIFREMD",
    body: "I can focnifrim with REEL EVDENCE that is CERTIFIABLE FACCT. It has long been known the truth inside of " +
    "TWIN TOWRES DEATH, that fuels are not sufficient strong to melt. It is being clear and evidetn tht 7/11 was Govmnt" +
    "CONSPIRACy to cause wars for MONEY. THis IS DEFIANTELY true, Ceritifuable FACTS. THe sheeples of Americas are wanting" +
    "to be eyes cover. This is WEAK response to TRUTHS that govmnets does hiding. RESISTANCE will be a neccesary reponse to" +
    "INJUStcies done by americas govemrnts. STAND UP TODAY",
    author: "tinfoil_hat",
    category: "redux",
    deleted: false
  } ,
  {
    id: "3",
    voteScore: 420,
    timestamp: 200000000,
    title: "Udacimemes to the MAX (LIT AF!!!)",
    body: "It may not be very clear, but I " +
    "very much enjoy the many glorious aspects of the WEEEDS. WEEDS are a blessing upon humanity. WEEDS, and " +
    "their natural counterpart, MEEMS, make up to of the fundamental pillars that have influenced all of human" +
    " thinking. It's difficult to quantify the profound effect they've had on human societal development; first" +
    " introduced in the legendary Time of Fade, the year 4:20 in the chantry calendars. The gods were forced to walk" +
    " upon the earth in human form, and were horrified by the extreme violence and unrest found on human planes" +
    " of existence. In efforts to calm the rage of human nature, the gods created from magick the ultimate truth, the " +
    "holy WEEED. Paired together with conceptual and philosophically related concepts in the form of MEEMS, human " +
    "peace and tranquility was finally on the horizon.",
    author: "faded",
    category: "udacity",
    deleted: false
  }
]

const initialCommentState = [
  {
    id: "a",
    parentId: "1",
    voteScore: 1,
    timestamp: 0,
    body: "So proud of you kiddo!! xoxoxo",
    author: "satin's Mam",
    deleted: false,
    parentDeleted: false
  },
  {
    id: "b",
    parentId: "1",
    voteScore: 1,
    timestamp: 0,
    body: "This is so funny lel, is that spanish language!! /?",
    author: "Memerino",
    deleted: false,
    parentDeleted: false
  },
  {
    id: "c",
    parentId: "1",
    voteScore: 23,
    timestamp: 0,
    body: "This is made for testing. It is a fake comment. FAKE NEWS",
    author: "Covfefe",
    deleted: false,
    parentDeleted: false
  },
]


function post (state = [], action) {
  const { id, title, author, body, category, timestamp } = action
  const findPostIndex = (state) => {
    return state.findIndex((post) => (post.id === id))
  }

  switch (action.type) {
    case GET_POSTS:
      return action.posts
    case UP_VOTE:
      return (() => {
        let newState = [...state]
        newState[findPostIndex(newState)].voteScore++
        return newState
      })()
    case DOWN_VOTE:
      return (() => {
        let newState = [...state]
        newState[findPostIndex(newState)].voteScore--
        return newState
      })()
    case EDIT_POST:
      return (() => {
        let newState = [...state]
        newState[findPostIndex(newState)].title = title
        newState[findPostIndex(newState)].body = body
        return newState
      })()
    case CREATE_POST:
      return [
        ...state,
        {
          id: id,
          voteScore: 1,
          timestamp: timestamp,
          title: title,
          body: body,
          author: author,
          category: category,
          deleted: false
        }
      ]
    case DELETE_POST:
      return (() => {
        let newState = [...state]
        newState[findPostIndex(newState)].deleted = true
        return newState
      })()
    default:
      return state
  }
}

function commentToEdit (state = "", action) {
  switch (action.type) {
    case LOAD_COMMENT_ID:
      return action.id
    default:
      return state
  }
}

function category (state = initialCategoryState, action) {
  const { category } = action

  switch  (action.type) {
    case CHANGE_CATEGORY:
      return category
    default:
      return state
  }
}

function sortOrder (state = initialSortOrderState, action) {
  const { sortOrder } = action

  switch (action.type) {
    case CHANGE_SORT_ORDER:
      return sortOrder
    default:
      return state
  }
}

function comment (state = [], action) {
  const { id, parentId, author, body, timestamp } = action
  const findCommentIndex = (state) => {
    return state.findIndex((comment) => (comment.id === id))
  }
  switch  (action.type) {
    case GET_COMMENTS:
      return action.comments
    case CREATE_COMMENT:
      return [
        ...state,
        {
          id: id,
          parentId: parentId,
          voteScore: 1,
          timestamp: timestamp,
          body: body,
          author: author,
          deleted: false,
          parentDeleted: false
        }
      ]
    case EDIT_COMMENT:
      return (() => {
        let newState = [...state]
        newState[findCommentIndex(newState)].body = body
        newState[findCommentIndex(newState)].timestamp = timestamp
        return newState
      })()
    case DELETE_COMMENT:
      return (() => {
        let newState = [...state]
        newState[findCommentIndex(newState)].deleted = true
        return newState
      })()
    case DELETE_PARENT:
      return (() => {
        let newState = [...state]
        newState[findCommentIndex(newState)].parentDeleted = true
        return newState
      })()
    case COMMENT_UP_VOTE:
      return (() => {
        let newState = [...state]
        newState[findCommentIndex(newState)].voteScore++
        return newState
      })()
    case COMMENT_DOWN_VOTE:
      return (() => {
        let newState = [...state]
        newState[findCommentIndex(newState)].voteScore--
        return newState
      })()
    default:
      return state
  }
}

export default combineReducers({
  post,
  category,
  comment,
  commentToEdit,
  sortOrder
})