function getData(){

  var netData = {"nodes": [], "links": []};
  var jobId = "66533bab73fbaf26c64dbb52224bd251";
  var jobName = "Computer Game Designer"; //这个变量要提前储存起来
  var relatedJobs = [];

  //-------------------
  //1. get related skills
  //-------------------
  fetch("http://api.dataatwork.org/v1/jobs/" + String(jobId) + "/related_skills")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

    //Push main job node into netData
    var mainNode = {};
    mainNode.id = data.job_uuid;
    mainNode.title = data.job_title;
    jobName = data.job_title;
    mainNode.group = 1;
    mainNode.importance = 15;
    mainNode.level = 1;
    netData.nodes.push(mainNode);

    //Push skill node and link into netData
    for (var i = 0; i < data.skills.length; i++) {
      // for (var i = 0; i < 10; i++) {

      var node_skill = {};
      node_skill.id = data.skills[i].skill_uuid;
      node_skill.title = data.skills[i].skill_name;
      node_skill.group = 2;
      node_skill.importance = data.skills[i].importance*3;
      node_skill.level = data.skills[i].level / 7;
      netData.nodes.push(node_skill);

      var link_skill = {};
      link_skill.source = data.job_title;
      link_skill.target = data.skills[i].skill_name;
      link_skill.importance = data.skills[i].importance;
      link_skill.level = data.skills[i].level;
      netData.links.push(link_skill);

    }

  }).catch(function(e) {
    console.log("Oops, error");
  });


  //-------------------
  //2. get related job
  //-------------------

  fetch("http://api.dataatwork.org/v1/jobs/" + String(jobId) + "/related_jobs")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

  //Push other job node and link into netData
    for (var i = 0; i < data.related_job_titles.length; i++) {
      // for (var i = 0; i < 10; i++) {

      var node_job = {};
      node_job.id = data.related_job_titles[i].uuid;
      node_job.title = data.related_job_titles[i].title;
      node_job.group = 1;
      node_job.importance = 8;
      node_job.level = 1;
      netData.nodes.push(node_job);

      //save related jobs then we can make link with skills
      relatedJobs.push(data.related_job_titles[i].uuid);

      var link_job = {};
      link_job.source = jobName;
      link_job.target = data.related_job_titles[i].title;
      link_job.importance = 1;
      link_job.level = 1;
      netData.links.push(link_job);

    }
  })
  .then(function(){
        makeRelatedJobLink(relatedJobs);
  }
  )
  .catch(function(e) {
    console.log("Oops, error");
  });

  return netData;


  function makeRelatedJobLink(joblist){

    for (var i = 0; i < relatedJobs.length; i++) {

      fetch("http://api.dataatwork.org/v1/jobs/" + String(relatedJobs[i]) + "/related_skills")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {

        //Push skill node and link into netData
        for (var j = 0; j < data.skills.length ; j++) {

          // var node_skill = {};
          // node_skill.id = data.skills[j].skill_uuid;
          // node_skill.title = data.skills[j].skill_name;
          // node_skill.group = 2;
          // netData.nodes.push(node_skill);

          var link_skill = {};
          link_skill.source = data.job_title;
          link_skill.target = data.skills[j].skill_name;
          link_skill.importance = data.skills[j].importance;
          link_skill.level = data.skills[j].level;
          netData.links.push(link_skill);

        }
        console.log("OK");

      }).catch(function(e) {
        console.log("Oops, error");
      });
    }
  }


}
