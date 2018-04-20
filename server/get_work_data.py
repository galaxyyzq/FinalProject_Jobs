from urllib2 import urlopen
import json

# Get the dataset

def get_json(url):
	response = urlopen(url)
	string = response.read().decode('utf-8')
	return json.loads(string)

def get_jobs():
	offset = 0
	limit = 500
	url = 'http://api.dataatwork.org/v1/jobs?offset=%d&limit=%d'
	jobs = []
	for offset in range(0, 46300, 500):
		json_obj = get_json(url%(offset, limit))
		jobs += json_obj[:-1]
		print(offset)
	with open("jobs.json", "w") as f:
		json.dump(jobs, f)

def get_skills():
	offset = 0
	limit = 500
	url = 'http://api.dataatwork.org/v1/skills?offset=%d&limit=%d'
	skills = []
	for offset in range(0, 27300, 500):
		json_obj = get_json(url%(offset, limit))
		skills += json_obj[:-1]
		print(offset)
	with open("skills.json", "w") as f:
		json.dump(skills, f)

def get_jobs_related(stop=50):
	count = 1
	url_skill = 'http://api.dataatwork.org/v1/jobs/%s/related_skills'
	url_job = 'http://api.dataatwork.org/v1/jobs/%s/related_jobs'
	with open("jobs.json", "r") as f:
		jobs = json.load(f)
		for job in jobs:
			if "skills" in dict.keys(job):
				continue
			uuid = job["uuid"]
			related_skills = get_json(url_skill%uuid)
			job["related_skills"] = related_skills["skills"]
			related_jobs = get_json(url_skill%uuid)
			job["related_jobs"] = related_jobs["related_job_titles"]
			count += 1
			print(count, " / ", len(jobs))
			if count >= stop:
				with open("job_related.json", "w") as fw:
					json.dump(jobs, fw)

def get_skills_related(stop=50):
	count = 1
	url_skill = 'http://api.dataatwork.org/v1/skills/%s/related_skills'
	url_job = 'http://api.dataatwork.org/v1/skills/%s/related_jobs'
	with open("skills.json", "r") as f:
		skills = json.load(f)
		for skill in skills:
			if "jobs" in dict.keys(skill):
				continue
			uuid = skill["uuid"]
			related_skills = get_json(url_skill%uuid)
			skill["related_skills"] = related_skills["related_skill_name"]
			related_jobs = get_json(url_skill%uuid)
			skill["related_jobs"] = related_jobs["jobs"]
			count += 1
			print(count, " / ", len(skills))
			if count >= stop:
				with open("skill_related.json", "w") as fw:
					json.dump(skills, fw)

def get_skills_related(stop=50):
	count = 1
	
	with open("skills.json", "r") as f:
		skills = json.load(f)
		for skill in skills:
			if "jobs" in dict.keys(skill):
				continue
			uuid = skill["uuid"]
			related_skills = get_json(url_skill%uuid)
			skill["related_skills"] = related_skills["skills"]
			related_jobs = get_json(url_skill%uuid)
			skill["related_jobs"] = related_jobs["jobs"]
			count += 1
			print(count, " / ", len(skills))
			if count >= stop:
				with open("skill_related.json", "w") as fw:
					json.dump(skills, fw)

def get_related(uuid, name):
	url_job_skill = 'http://api.dataatwork.org/v1/jobs/%s/related_skills'
	url_job_job = 'http://api.dataatwork.org/v1/jobs/%s/related_jobs'
	url_skill_skill = 'http://api.dataatwork.org/v1/skills/%s/related_skills'
	url_skill_job = 'http://api.dataatwork.org/v1/skills/%s/related_jobs'
	if name == "JS":
		return get_json(url_job_skill%uuid)
	if name == "JJ":
		return get_json(url_job_job%uuid)
	if name == "SJ":
		return get_json(url_skill_job%uuid)
	if name == "SS":
		return get_json(url_skill_skill%uuid)

def get_jobs_depth(save=2):
	count = 1
	
	with open("jobs.json", "r") as f:
		jobs = json.load(f)
		job_related = []
		for job in jobs:
			uuid = job["uuid"]
			related_skills = get_related(uuid, "JS")
			related_jobs = get_related(uuid, "JJ")
			
			job["related_skills"] = related_skills["skills"][:5]
			for skill in job["related_skills"]:
				skill_sj = get_related(skill["skill_uuid"], "SJ")
				skill_ss = get_related(skill["skill_uuid"], "SS")
				skill["related_skills"] = skill_ss["skills"]
				skill["related_jobs"] = skill_sj["jobs"]
			job["related_jobs"] = related_jobs["related_job_titles"][:5]
			for rj in job["related_jobs"]:
				rj_js = get_related(rj["uuid"], "JS")
				rj_jj = get_related(rj["uuid"], "JJ")
				rj["related_skills"] = rj_js["skills"]
				rj["related_jobs"] = rj_jj["related_job_titles"]
			count += 1
			job_related.append(job)
			print(count, " / ", len(jobs))
			if count % save == 0:
				with open("job_related.json", "w") as fw:
					json.dump(job_related, fw)

get_jobs_depth()
