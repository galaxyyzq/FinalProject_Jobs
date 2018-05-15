export const STATUS_INITAL = 'STATUS_INITAL'
export const STATUS_LOADING = 'STATUS_LOADING'
export const STATUS_LOADED = 'STATUS_LOADED'
export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'
export const NUMBER_JOBS = 6
export const NUMBER_SKILLS = 10
export const NUMBER_QUANLIST = 8
// API
export const API_JOB_ID = 'https://api.dataatwork.org/v1/jobs/'
export const API_JOBS = 'https://api.dataatwork.org/v1/jobs?limit='
export const API_JOB_SEARCH = 'https://api.dataatwork.org/v1/jobs/autocomplete?contains='
export const API_JOB_RELATED_SKILLS = 'https://api.dataatwork.org/v1/jobs/%s/related_skills'
export const API_JOB_RELATED_JOBS = 'http://api.dataatwork.org/v1/jobs/%s/related_jobs'
export const API_SKILL_ID = 'https://api.dataatwork.org/v1/skills/'
export const API_SKILLS = 'https://api.dataatwork.org/v1/skills?limit='
export const API_SKILL_SEARCH = 'https://api.dataatwork.org/v1/skills/autocomplete?contains='
export const API_SKILLS_RELATED_JOBS = 'https://api.dataatwork.org/v1/skills/%s/related_jobs'
export const API_SKILLS_RELATED_SKILLS = 'http://api.dataatwork.org/v1/skills/%s/related_skills'
// job picture
export const API_PIC_JOB = 'https://api.unsplash.com/search/photos/?page=1&per_page=5&query=%s&client_id=283a9e473f003aa495705329ca89b88cd2d81f4d4304836c9c1037a0fde8c174'
// static file
export const URL_JSON_JOBS = 'https://yipeitu.github.io/FinalProject_Jobs/server/jobs.json'
export const URL_JSON_SKILLS = 'https://yipeitu.github.io/FinalProject_Jobs/server/skills.json'
export const URL_JSON_SKILL_JOBS = 'https://yipeitu.github.io/FinalProject_Jobs/server/skills_relatedJobs.json'
// MSG
export const FETCH_DONE = 'FETCH_DONE'
// Default
export const DEFAULT_KEY_WORD = "player"
export const DEFAULT_FIREBASE_AUTH_KEY = "AIzaSyA9P7D8R0aFE7X"
export const DEFAULT_APP_TOKEN_KEY = "807556958478-37vmdvppn91f13l70p14bpsqsr273son.apps.googleusercontent.com"
export const DEFAULT_GOOGLE_TREND = "https://trends.google.com:443/trends/embed/explore/TIMESERIES?req=%7B%22comparisonItem%22%3A%5B%7B%22keyword%22%3A%22loading...%22%2C%22geo%22%3A%22%22%2C%22time%22%3A%22today%2012-m%22%7D%5D%2C%22category%22%3A0%2C%22property%22%3A%22%22%7D&tz=-120&eq=q%3Dtrump%26date%3Dtoday%2012-m"