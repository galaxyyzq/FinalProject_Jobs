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

get_jobs()