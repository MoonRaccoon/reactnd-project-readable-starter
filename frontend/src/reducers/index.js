import { combineReducers } from 'redux'
import {CHANGE_CATEGORY} from "../actions/index";

const initialCategoryState = 'all'

const initialPostState = [
  {
    id: 1,
    voteScore: 666,
    timestamp: 0,
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
    id: 2,
    voteScore: 711,
    timestamp: 0,
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
    id: 3,
    voteScore: 420,
    timestamp: 0,
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


function post (state = initialPostState, action) {
  switch (action.type) {
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

export default combineReducers({
  post,
  category,
})