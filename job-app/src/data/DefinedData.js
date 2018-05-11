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
export const DEFAULT_KEY_WORD = "program"