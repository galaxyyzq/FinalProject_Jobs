/* Action type */
export const SEARCH_FUNCTION = 'SEARCH_FUNCTION'
export const SELECT_SKILLS = 'SELECT_SKILLS'
export const SKILLS_ORDER = 'SKILLS_ORDER'
export const REQUEST_SKILL = 'REQUEST_SKILL'
export const RECEIVE_SKILL = 'RECEIVE_SKILL'
export const REQUEST_JOB = 'REQUEST_JOB'
export const RECEIVE_JOB = 'RECEIVE_JOB'

/* action creators */
export const searchFunction = keyWord => ({
  type: SEARCH_FUNCTION,
  keyWord
})

export const selectSkills = skill => ({
  type: SELECT_SKILLS,
  skill
})

export const skillsOrder = skillIndex => ({
  type: SKILLS_ORDER,
  skillIndex
})

export const requestSkill = keyWord => ({
  type: REQUEST_SKILL,
  keyWord
})

export const receiveSkill = (keyWord, json) => ({
  type: RECEIVE_SKILL,
  keyWord,
  skills: json
})

export const requestJob = keyWord => ({
  type: REQUEST_JOB,
  keyWord
})

export const receiveJob = (keyWord, json) => ({
  type: RECEIVE_JOB,
  keyWord,
  jobs: json
})

const fetchSkills = keyWord => dispatch => {
  dispatch(requestSkill(keyWord))
  return fetch(`http://api.dataatwork.org/v1/skills/autocomplete?contains=${keyWord}`)
    .then(response => response.json())
    .then(json => dispatch(receiveSkill(keyWord, json)))
}

const fetchJobs = keyWord => dispatch => {
  dispatch(requestJob(keyWord))
  return fetch(`http://api.dataatwork.org/v1/jobs/autocomplete?contains=${keyWord}`)
    .then(response => response.json())
    .then(json => dispatch(receiveJob(keyWord, json)))
}

// const shouldFetchPosts = (state, keyWord) => {
//   const posts = state.postsBySubreddit[subreddit]
//   if (!posts) {
//     return true
//   }
//   if (posts.isFetching) {
//     return false
//   }
//   return posts.didInvalidate
// }

// export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
//   if (shouldFetchPosts(getState(), subreddit)) {
//     return dispatch(fetchPosts(subreddit))
//   }
// }
//////////////////////
// export const REQUEST_POSTS = 'REQUEST_POSTS'
// export const RECEIVE_POSTS = 'RECEIVE_POSTS'
// export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
// export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

// export const selectSubreddit = subreddit => ({
//   type: SELECT_SUBREDDIT,
//   subreddit
// })

// export const invalidateSubreddit = subreddit => ({
//   type: INVALIDATE_SUBREDDIT,
//   subreddit
// })

// export const requestPosts = subreddit => ({
//   type: REQUEST_POSTS,
//   subreddit
// })

// export const receivePosts = (subreddit, json) => ({
//   type: RECEIVE_POSTS,
//   subreddit,
//   posts: json.data.children.map(child => child.data),
//   receivedAt: Date.now()
// })

// const fetchPosts = subreddit => dispatch => {
//   dispatch(requestPosts(subreddit))
//   return fetch(`https://www.reddit.com/r/${subreddit}.json`)
//     .then(response => response.json())
//     .then(json => dispatch(receivePosts(subreddit, json)))
// }

// const shouldFetchPosts = (state, subreddit) => {
//   const posts = state.postsBySubreddit[subreddit]
//   if (!posts) {
//     return true
//   }
//   if (posts.isFetching) {
//     return false
//   }
//   return posts.didInvalidate
// }

// export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
//   if (shouldFetchPosts(getState(), subreddit)) {
//     return dispatch(fetchPosts(subreddit))
//   }
// }
