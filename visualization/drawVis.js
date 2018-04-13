var netData = getData();
console.log(netData);


//Draw the visualization
function drawVis(netData){

  var svg = d3.select("svg")
  .call(d3.zoom().on("zoom", function() {
    svg.attr("transform", d3.event.transform)
  })).on("dblclick.zoom", null),
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
  .force("charge", d3.forceManyBody().distanceMax(500).strength(-800))
  .force("center", d3.forceCenter(width / 2, height / 2));




  //Step 2: Drawing
  var link = svg.append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(netData.links)
  .enter().append("line")
  .attr("stroke-opacity", function(d){
    if (d.importance>10) {
      return 0.45;
    } else {
      return 0.13;
    }
  })
  .attr("stroke", function(d) {
    if (d.importance>10) {
      return "#3379E4";
    } else {
      return "#EF6E8D";
    }
  })
  .attr("stroke-width", function(d) {
    if (d.importance>10) {
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
