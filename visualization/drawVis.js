var netData = getData();

//等待数据加载完，延迟1s绘图，需要用其它方法来解决
// setTimeout("drawVis(netData)", 5000);
// drawVis(netData);


//Draw the visualization
function drawVis(netData){

  var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

  // var color = d3.scaleOrdinal(d3.schemeCategory20);
  // var color = d3.interpolateRdYlBu;


  var simulation = d3.forceSimulation()
  .force("link", d3.forceLink().id(function(d) { return d.title; }).distance(80).strength(0.2))
  .force("charge", d3.forceManyBody().distanceMax(500).strength(-800))
  .force("center", d3.forceCenter(width / 2, height / 2));

  // d3.json("data/Main_ComputerGameDesigner.json", function(error, raw) {
  //   if (error) throw error;

  // Step 1: Change data structure
  // var netData = dataProcess(raw);

  // Step 2: Drawing
  var link = svg.append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(netData.links)
  .enter().append("line")
  .attr("stroke-opacity", 0.1)
  // .attr("stroke-width", function(d) { return d.importance; });
  .attr("stroke-width", 0.5);

  var node = svg.append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(netData.nodes)
  .enter().append("circle")
  .attr("r", function(d) { return d.importance})
  .attr("fill", function(d) {
    if (d.group == 1) {
      return "#2796CB";
    } else {
      return d3.interpolateRdPu(d.level);
    }
     })
     .attr("stroke", function(d) {
       if (d.group == 1) {
         return "#2796CB";
       } else {
         return d3.interpolateRdPu(d.level);
       }
        })
  .call(d3.drag()
  .on("start", dragstarted)
  .on("drag", dragged)
  .on("end", dragended));

  node.append("title")
  .text(function(d) { return d.id; });

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
