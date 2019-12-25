import { Component, OnInit } from '@angular/core';
import { Collaborateur } from '../collaborateurs/collaborateur';
import { CollaborateurService } from '../collaborateur.service';
import * as d3 from 'd3';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collab',
  templateUrl: './collab.component.html',
  styleUrls: ['./collab.component.css']
})
export class CollabComponent implements OnInit {
  collaborateurs: Collaborateur[];
  constructor(public CollaborateurService: CollaborateurService,private router:Router) { }

  ngOnInit() {
    //this.getcollaborateurs();
  }

  getCollaborateurs() {
    this.CollaborateurService.getCollaborateurs().subscribe(collaborateurs => { this.collaborateurs = collaborateurs; this.makechart(this.collaborateurs,this.router);});
  }
  makechart(collaborateurs,router) {


    var diameter = 960,
      format = d3.format(",d"),
      color = d3.scaleOrdinal(d3.schemeAccent);

    var bubble = d3.pack()
      .size([diameter, diameter])
      .padding(1.5);

    var svg = d3.select("body").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");



    var data: any;
    data = transformJsonToD3Json(collaborateurs)
    var root = d3.hierarchy(classes(data))
      .sum(function (d: any) { return d.value; })
      .sort(function (a, b) { return b.value - a.value; });

    bubble(root);
    var node = svg.selectAll(".node")
      .data(root.children)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d: any) { return "translate(" + d.x + "," + d.y + ")"; })
      .style('cursor', 'pointer');

    svg.selectAll('text').on("mouseover", function () {
      alert("hover");
    });

    svg.append("style").text(".bubble{margin:auto;display:block;}g circle:hover {fill:gray !important;}g:hover {fill:blue !important;} ");

    node.append("title")
      .text(function (d: any) { return d.data.className + ": " + format(d.value); });

    node.append("circle")
      .on("click", function (d:any) { router.navigate(['details/' + d.data.id]);console.log("nav") })
      .attr("r", function (d: any) { return d.r; })
      .style("fill", function (d: any) {
        return color(Math.random().toString());
      });

    node.append("text")
      .on("click", function (d:any) { router.navigate(['details/' + d.data.id]) })
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function (d: any) { return d.data.className.substring(0, d.r / 3); });

    // Returns a flattened hierarchy containing all leaf nodes under the root.
    function classes(root) {
      var classes = [];

      function recurse(name, node) {
        if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });
        else classes.push({ packageName: name, className: node.name, value: node.rate, id: node.id });
      }

      recurse(null, root);
      return { children: classes };
    }
    function transformJsonToD3Json(data) {
      var dataJson: any;
      if (data) {
        dataJson = { "children": data };
      }
      return dataJson;

    }
    d3.select(self.frameElement).style("height", diameter + "px");
  }



}
