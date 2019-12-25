import { Component, OnInit } from '@angular/core';
import { Collaborateur } from '../collaborateurs/collaborateur';
import { CollaborateurService } from '../collaborateur.service';
import * as d3 from 'd3';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, isEmpty } from 'rxjs/operators';


@Component({
  selector: 'app-collaborateur-card',
  templateUrl: './collaborateur-card.component.html',
  styleUrls: ['./collaborateur-card.component.scss']
})
export class CollaborateurCardComponent implements OnInit {
  private searchTerms = new Subject<string>();
  constructor(public collaborateurService: CollaborateurService, private router: Router) { }

  ngOnInit() {
    this.getCollaborateurs();
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.collaborateurService.searchCollaborateur(term))
    ).subscribe((collaborateurs) => {
      if (collaborateurs.length != 0) {
        this.makechart(collaborateurs, this.router);
      } else {
        this.getCollaborateurs();
      }
    })
  }
  getCollaborateurs() {
    this.collaborateurService.getCollaborateurs().subscribe(collaborateurs => { this.makechart(collaborateurs, this.router); });
  }
  search(term: string): void {
    this.searchTerms.next(term);
  }

  makechart(collaborateurs, router) {
    var diameter = 960,
      format = d3.format(",d"),
      color = d3.scaleOrdinal(d3.schemeAccent);

    var bubble = d3.pack()
      .size([diameter, diameter])
      .padding(1.5);

    d3.select("svg").remove();

    var svg = d3.select("app-collaborateur-card").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

    var data: any;
    data = transformJsonToD3Json(collaborateurs);

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

 

    node.append("title")
      .text(function (d: any) { return d.data.className + ": " + format(d.value); });

    node.append("circle")
      .on("click", function (d: any) { router.navigate(['details/' + d.data.id]) })
      .attr("r", function (d: any) { return d.r; })
      .style("fill", function (d: any) {
        return color(Math.random().toString());
      });
      // var images = node.append("svg:image")
      // .attr("xlink:href", function (d:any) {console.log(d.data.id); return "https://randomuser.me/api/portraits/thumb/men/"+d.data.id+".jpg";  })
      // .attr("x", function (d) { return -25; })
      // .attr("y", function (d) { return -25; })
      // .attr("height", function(d:any){return d.r;})
      // .attr("width", function(d:any){return d.r;});

    node.append("text")
      .on("click", function (d: any) { router.navigate(['details/' + d.data.id]) })
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function (d: any) { return d.data.className.substring(0, d.r / 3); });

    svg.append("style").text(".bubble{margin:auto;display:block;}g circle:hover {fill:gray !important;}g:hover {fill:blue !important;} ");

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


