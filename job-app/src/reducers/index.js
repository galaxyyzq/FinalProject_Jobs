// import { combineReducers } from 'redux'
// import {
//   SEARCH_FUNCTION, SELECT_SKILLS, SKILLS_ORDER, REQUEST_SKILL,
//   RECEIVE_SKILL, REQUEST_JOB, RECEIVE_JOB
// } from '../actions'



// import {
//   SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
//   REQUEST_POSTS, RECEIVE_POSTS
// } from '../actions'  

// const selectedSubreddit = (state = 'reactjs', action) => {
//   switch (action.type) {
//     case SELECT_SUBREDDIT:
//       return action.subreddit
//     default:
//       return state
//   }
// }

// const posts = (state = {
//   isFetching: false,
//   didInvalidate: false,
//   items: []
// }, action) => {
//   switch (action.type) {
//     case INVALIDATE_SUBREDDIT:
//       return {
//         ...state,
//         didInvalidate: true
//       }
//     case REQUEST_POSTS:
//       return {
//         ...state,
//         isFetching: true,
//         didInvalidate: false
//       }
//     case RECEIVE_POSTS:
//       return {
//         ...state,
//         isFetching: false,
//         didInvalidate: false,
//         items: action.posts,
//         lastUpdated: action.receivedAt
//       }
//     default:
//       return state
//   }
// }

// const postsBySubreddit = (state = { }, action) => {
//   switch (action.type) {
//     case INVALIDATE_SUBREDDIT:
//     case RECEIVE_POSTS:
//     case REQUEST_POSTS:
//       console.log(state)
//       console.log([action.subreddit])
//       console.log(state[action.subreddit], action)
//       return {
//         ...state,
//         [action.subreddit]: posts(state[action.subreddit], action)
//       }
//     default:
//       return state
//   }
// }

// const rootReducer = combineReducers({
//   postsBySubreddit,
//   selectedSubreddit
// })

// export default rootReducer
