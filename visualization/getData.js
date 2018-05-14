
function getData(netData){

  var netData = {"nodes": [], "links": [], "finished": false};
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
    mainNode.group = 0;
    mainNode.importance = 40;
    mainNode.level = 1;
    netData.nodes.push(mainNode);

    //Push skill node and link into netData
    for (var i = 0; i < data.skills.length; i++) {
      // for (var i = 0; i < 10; i++) {

      var node_skill = {};
      node_skill.id = data.skills[i].skill_uuid;
      node_skill.title = data.skills[i].skill_name;
      node_skill.group = 2;
      node_skill.importance = (data.skills[i].importance)*2.5;
      node_skill.level = (data.skills[i].level) / 7;
      netData.nodes.push(node_skill);

      var link_skill = {};
      link_skill.source = data.job_title;
      link_skill.target = data.skills[i].skill_name;
      link_skill.importance = data.skills[i].importance;
      link_skill.level = data.skills[i].level;
      link_skill.group = 12;
      netData.links.push(link_skill);

    }
  })
  .then(function(data){searchRelatedJob()})
  .catch(function(e) {
    console.log("Oops, error");
  });


  //-------------------
  //2. get related job
  //-------------------



  // return netData;

  function drawVis(netData){

    var svg = d3.select("svg")
    // .call(d3.zoom().on("zoom", function() {
    //   svg.attr("transform", d3.event.transform)
    // }))
    // .on("dblclick.zoom", null),
    width = +svg.attr("width"),
    height = +svg.attr("height");

    var tooltip = d3.select("body")
    .append("div")
    .attr("class","tooltip")
    .style("fill-opacity",0)
    .style("z-index",1)
    .style("position","absolute");

    //Set Force
    var simulation = d3.forceSimulation()
    .force("link", d3.forceLink()
    .id(function(d) { return d.title; }))
    // .distance(function(d) {return d.importance*10 })
    // .strength(function(d) {return d.level/8 }))
    // .force("charge", d3.forceManyBody().distanceMax(500).strength(-800))
    .force("charge", d3.forceManyBody().distanceMax(360).strength(-400))
    .force("center", d3.forceCenter(width / 2, height / 2));




    //Step 2: Drawing
    var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(netData.links)
    .enter().append("line")
    .attr("stroke-opacity", function(d){
      if (d.group == 11) {
        return 0.45;
      } else {
        return 0.13;
      }
    })
    .attr("stroke", function(d) {
      if (d.group == 11) {
        return "#3379E4";
      } else {
        return "#EF6E8D";
      }
    })
    .attr("stroke-width", function(d) {
      if (d.group == 11) {
        return 3;
      } else {
        return 1;
      }
    });

    var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(netData.nodes)
    .enter().append("circle")
    .attr("r", function(d) { return d.importance})
    .attr("class", function(d){
      if (d.group == 1) {
        return "jobNode";
      }
      if (d.group == 0) {
        return "mainNode"
      }
    })
    .attr("fill", function(d) {
      if (d.group == 2) {
        return d3.interpolateRdPu(d.level);
      }
    })
    .attr("stroke", function(d) {
      if (d.group == 2) {
        return d3.interpolateRdPu(d.level);
      }
    })
    .on("mouseover",function(d){
      if (d.group == 2) {
        tooltip.html("<span class=\'tooltipTitle\'> Related Skill </span><br>"+d.title
        +"<hr><span class=\'tooltipSkill\'>skill level:"+d.level*7
        +"<br>skill importance:"+d.importance/2.5 +"</span>")
        .style("left",(d3.event.pageX) + "px")
        .style("top",(d3.event.pageY) + "px")
        .style("opacity",1.0);
        d3.select(this)
        .attr("class", "highlight")
      }
      else if (d.group == 1) {
        tooltip.html("<span class=\'tooltipTitle\'> Related Job </span><br>"+d.title)
        .style("left",(d3.event.pageX) + "px")
        .style("top",(d3.event.pageY) + "px")
        .style("opacity",1.0);
        d3.select(this)
        .attr("class", "highlight")
      } else {
        tooltip.html("<span class=\'tooltipTitle\'> Job Name </span><br>"+d.title)
        .style("left",(d3.event.pageX) + "px")
        .style("top",(d3.event.pageY) + "px")
        .style("opacity",1.0);
        d3.select(this)
        .attr("class", "highlight")
      }

    })
    .on("mouseout",function(d){
      tooltip.style("opacity",0);
      d3.select(this)
      .attr("class", function(d){
        if (d.group == 1) {
          return "jobNode";
        }
        if (d.group == 0) {
          return "mainNode"
        }
      })
      .attr("fill", function(d) {
        if (d.group == 2) {
          return d3.interpolateRdPu(d.level);
        }
      })
      .attr("stroke", function(d) {
        if (d.group == 2) {
          return d3.interpolateRdPu(d.level);
        }
      })
    })
    .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));


    // node.append("title")
    // .text(function(d) { return d.id; });

    simulation.nodes(netData.nodes)
    .on("tick", ticked);

    simulation.force("link")
    .links(netData.links);

    function ticked() {
      link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

      node
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
    }
    // });

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

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
          // node_skill.importance = (data.skills[j].importance)*2.5;
          // node_skill.level = (data.skills[j].level) / 7;
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

  function searchRelatedJob(){
    fetch("http://api.dataatwork.org/v1/jobs/" + String(jobId) + "/related_jobs")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {

      nodeNumber=netData.nodes.length;
      // console.log(netData.nodes);
      // console.log(netData.nodes.length);

    //Push other job node and link into netData
      for (var i = 0; i < data.related_job_titles.length; i++) {
        // for (var i = 0; i < 10; i++) {

        var node_job = {};
        node_job.id = data.related_job_titles[i].uuid;
        node_job.title = data.related_job_titles[i].title;
        node_job.group = 1;
        node_job.importance = 14;
        node_job.level = 1;
        netData.nodes.push(node_job);

        // console.log(netData.nodes);


        for (var j = 1; j < nodeNumber; j++) {
          var link_skill={};
          if (netData.nodes[j].group == 2) {
            link_skill.target = data.related_job_titles[i].title;
            link_skill.source = netData.nodes[j].title;
            link_skill.importance = netData.nodes[j].importance;
            link_skill.level = netData.nodes[j].level;
            link_skill.group = 12;
            netData.links.push(link_skill);
          }


        }

        //save related jobs then we can make link with skills
        // relatedJobs.push(data.related_job_titles[i].uuid);

        var link_job = {};
        link_job.source = jobName;
        link_job.target = data.related_job_titles[i].title;
        link_job.importance = 101;
        link_job.level = 101;
        link_job.group = 11;
        netData.links.push(link_job);


      }
    })
    // .then(function(data){
    //   makeRelatedJobLink(relatedJobs);
    // })
    .then(function(){

          drawVis(netData)
    }
    )
    .catch(function(e) {
      console.log("Oops, error");
    });
  }



}
