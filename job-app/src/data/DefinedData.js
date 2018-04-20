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
export const API_JOB_ID = 'http://api.dataatwork.org/v1/jobs/'
export const API_JOBS = 'http://api.dataatwork.org/v1/jobs?limit='
export const API_JOB_SEARCH = 'http://api.dataatwork.org/v1/jobs/autocomplete?contains='
export const API_JOB_RELATED_SKILLS = 'http://api.dataatwork.org/v1/jobs/%s/related_skills'
export const API_SKILL_ID = 'http://api.dataatwork.org/v1/skills/'
export const API_SKILLS = 'http://api.dataatwork.org/v1/skills?limit='
export const API_SKILL_SEARCH = 'http://api.dataatwork.org/v1/skills/autocomplete?contains='
export const API_SKILLS_RELATED_JOBS = 'http://api.dataatwork.org/v1/skills/%s/related_jobs'