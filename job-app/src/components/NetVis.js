import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as d3 from "d3";

class NetVis extends Component {

//   constructor(props){
//     super(props)
//     this.drawNetVis = this.drawNetVis.bind(this)
//   }
//
//   componentDidUpdate(){
//     const netData = this.dataProcess()
//     if(netData.nodes.length === 0 || netData.links.length === 0){
//       return (
//         <div>loading...</div>
//         )
//     }
//     else {
//       this.drawNetVis();
//   }
// }
//
//   componentDidMount(){
//     const netData = this.dataProcess()
//     if(netData.nodes.length === 0 || netData.links.length === 0){
//       return (
//         <div>loading...</div>
//         )
//     }
//     else {
//       this.drawNetVis();
//   }
// }
//
//   static propTypes = {
//     data: PropTypes.object.isRequired,
//     relatedJobs: PropTypes.array.isRequired,
//     relatedSkills: PropTypes.array.isRequired
//   }
//
//   // dataProcess的作用是将数据转成适合作图的格式
//   // 在当中需要构建一个netData的对象来满足绘图数据要求
//   dataProcess(){
//
//     const {data, relatedJobs, relatedSkills} = this.props;
//     const netData = {"nodes": [], "links": []};
//
//     //Push main job node into netData
//     console.log(data);
//     console.log(relatedJobs);
//     console.log(relatedSkills);
//
//     const mainNode = {};
//     mainNode.id = data.uuid;
//     mainNode.title = data.title;
//     mainNode.group = 0;
//     mainNode.importance = 40;
//     mainNode.level = 1;
//     netData.nodes.push(mainNode);
//
//
//     //Push skill node and link into netData
//     if(relatedSkills !== undefined) {
//     for (var i = 0; i < relatedSkills.length; i++) {
//       if(relatedSkills[i] !== undefined) {
//       var node_skill = {};
//       node_skill.id = relatedSkills[i].skill_uuid;
//       node_skill.title = relatedSkills[i].skill_name;
//       node_skill.group = 2;
//       node_skill.importance = (relatedSkills[i].importance)*2.5;
//       node_skill.level = (relatedSkills[i].level) / 7;
//       netData.nodes.push(node_skill);
//
//       var link_skill = {};
//       link_skill.source = data.title;
//       link_skill.target = relatedSkills[i].skill_name;
//       link_skill.importance = relatedSkills[i].importance;
//       link_skill.level = relatedSkills[i].level;
//       netData.links.push(link_skill);
//     }
//     }
//   }
//
//     //Push other job node and link into netData
//     if(relatedJobs !== undefined){
//     for (var i = 0; i < relatedJobs.length; i++) {
//       if(relatedJobs[i] !== undefined) {
//         var node_job = {};
//         node_job.id = relatedJobs[i].uuid;
//         node_job.title = relatedJobs[i].title;
//         node_job.group = 1;
//         node_job.importance = 14;
//         node_job.level = 1;
//         netData.nodes.push(node_job);
//
//         //save related jobs then we can make link with skills
//         relatedJobs.push(relatedJobs[i].uuid);
//
//         var link_job = {};
//         link_job.source = data.title;
//         link_job.target = relatedJobs[i].title;
//         link_job.importance = 101;
//         link_job.level = 101;
//         netData.links.push(link_job);
//       }
//       }
//     }
//     return netData;
//   }
//
//   // drawNetVis作用是进行可视化绘制
//   drawNetVis(netData){
//
//       // const vis=this.rootNode;
//
//       var svg = d3.select(this.node)
//       .call(d3.zoom().on("zoom", function() {
//         svg.attr("transform", d3.event.transform)
//         })).on("dblclick.zoom", null),
//         width = +svg.attr("width"),
//         height = +svg.attr("height");
//
//       var tooltip = d3.select(this.node)
//       .append("div")
//       .attr("class","tooltip")
//       .style("fill-opacity",0)
//       .style("z-index",1)
//       .style("position","absolute");
//
//       //Set Force
//       var simulation = d3.forceSimulation()
//       .force("link", d3.forceLink()
//       .id(function(d) { return d.title; }))
//       // .distance(function(d) {return d.importance*10 })
//       // .strength(function(d) {return d.level/8 }))
//       // .force("charge", d3.forceManyBody().distanceMax(500).strength(-800))
//       .force("charge", d3.forceManyBody().distanceMax(500).strength(-800))
//       .force("center", d3.forceCenter(width / 2, height / 2));
//
//       //Step 2: Drawing
//       var link = svg.append("g")
//       .attr("class", "links")
//       .selectAll("line")
//       .data(netData.links)
//       .enter().append("line")
//       .attr("stroke-opacity", function(d){
//         if (d.importance>10) {
//           return 0.45;
//         } else {
//           return 0.13;
//         }
//       })
//       .attr("stroke", function(d) {
//         if (d.importance>10) {
//           return "#3379E4";
//         } else {
//           return "#EF6E8D";
//         }
//       })
//       .attr("stroke-width", function(d) {
//         if (d.importance>10) {
//           return 3;
//         } else {
//           return 1;
//         }
//       });
//
//       var node = svg.append("g")
//       .attr("class", "nodes")
//       .selectAll("circle")
//       .data(netData.nodes)
//       .enter().append("circle")
//       .attr("r", function(d) { return d.importance})
//       .attr("class", function(d){
//         if (d.group == 1) {
//           return "jobNode";
//         }
//         if (d.group == 0) {
//           return "mainNode"
//         }
//       })
//       .attr("fill", function(d) {
//         if (d.group == 2) {
//           return d3.interpolateRdPu(d.level);
//         }
//       })
//       .attr("stroke", function(d) {
//         if (d.group == 2) {
//           return d3.interpolateRdPu(d.level);
//         }
//       })
//       .on("mouseover",function(d){
//         if (d.group == 2) {
//           tooltip.html("<span class=\'tooltipTitle\'> Related Skill </span><br>"+d.title
//           +"<hr><span class=\'tooltipSkill\'>skill level:"+d.level*7
//           +"<br>skill importance:"+d.importance/2.5 +"</span>")
//           .style("left",(d3.event.pageX) + "px")
//           .style("top",(d3.event.pageY) + "px")
//           .style("opacity",1.0);
//           d3.select(this)
//           .attr("class", "highlight")
//         }
//         else if (d.group == 1) {
//           tooltip.html("<span class=\'tooltipTitle\'> Related Job </span><br>"+d.title)
//           .style("left",(d3.event.pageX) + "px")
//           .style("top",(d3.event.pageY) + "px")
//           .style("opacity",1.0);
//           d3.select(this)
//           .attr("class", "highlight")
//         } else {
//           tooltip.html("<span class=\'tooltipTitle\'> Job Name </span><br>"+d.title)
//           .style("left",(d3.event.pageX) + "px")
//           .style("top",(d3.event.pageY) + "px")
//           .style("opacity",1.0);
//           d3.select(this)
//           .attr("class", "highlight")
//         }
//
//       })
//       .on("mouseout",function(d){
//         tooltip.style("opacity",0);
//         d3.select(this)
//         .attr("class", function(d){
//           if (d.group == 1) {
//             return "jobNode";
//           }
//           if (d.group == 0) {
//             return "mainNode"
//           }
//         })
//         .attr("fill", function(d) {
//           if (d.group == 2) {
//             return d3.interpolateRdPu(d.level);
//           }
//         })
//         .attr("stroke", function(d) {
//           if (d.group == 2) {
//             return d3.interpolateRdPu(d.level);
//           }
//         })
//       })
//       .call(d3.drag()
//       .on("start", dragstarted)
//       .on("drag", dragged)
//       .on("end", dragended));
//
//
//       // node.append("title")
//       // .text(function(d) { return d.id; });
//
//       simulation.nodes(netData.nodes)
//       .on("tick", ticked);
//
//       simulation.force("link")
//       .links(netData.links);
//
//       function ticked() {
//         link
//         .attr("x1", function(d) { return d.source.x; })
//         .attr("y1", function(d) { return d.source.y; })
//         .attr("x2", function(d) { return d.target.x; })
//         .attr("y2", function(d) { return d.target.y; });
//
//         node
//         .attr("cx", function(d) { return d.x; })
//         .attr("cy", function(d) { return d.y; });
//       }
//       // });
//
//       function dragstarted(d) {
//         if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//         d.fx = d.x;
//         d.fy = d.y;
//       }
//
//       function dragged(d) {
//         d.fx = d3.event.x;
//         d.fy = d3.event.y;
//       }
//
//       function dragended(d) {
//         if (!d3.event.active) simulation.alphaTarget(0);
//         d.fx = null;
//         d.fy = null;
//       // }
//
//     }
//   }

  // render() {
  //   //在这里执行可视化绘制函数
  //   const netData = this.dataProcess()
  //   console.log(netData)
  //   if(netData.nodes.length === 0 || netData.links.length === 0){
  //     return (
  //       <div>loading...</div>
  //       )
  //   }
  //   else {
  //     this.drawNetVis();
  //     //底下这行作用是将react处理dom的权利给D3，让d3来作图
  //     return (
  //       <div className="NetVis">

  //       <svg ref={(node) => this.rootNode = node} />
  //       </div>
  //     );
  //   }

  // }
  render() {
    //在这里执行可视化绘制函数
    // const netData = this.dataProcess()
    // if(netData.nodes.length === 0 || netData.links.length === 0){
    //   return (
    //     <div>to be continued...</div>
    //     )
    // }
    // else {
    //   this.drawNetVis();
    //   //底下这行作用是将react处理dom的权利给D3，让d3来作图
      return (
        <div className="NetVis">
        <svg ref={(node) => this.node = node} />
        </div>
      );
    }

  }


// }

export default NetVis;
