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
    var diameter = 1000,
      format = d3.format(",d"),
      color = d3.scaleOrdinal(d3.schemeAccent);

    var bubble = d3.pack()
      .size([diameter, diameter]);
    // .padding(1.5)

    d3.select("svg").remove();

    var svg = d3.select("app-collaborateur-card").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

    var data: any;
    data = transformJsonToD3Json(collaborateurs);
    // d3.json("assets/mockdata.json").then((data) => {
      var root = d3.hierarchy(classes(data))
        .sum(function (d: any) { return d.value; });
      // .sort(function (a, b) { return b.value - a.value; })
      //console.log(root.children.length);
      bubble(root);


      var node = svg.selectAll(".node")
        .data(root.children)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d: any) { return "translate(" + d.x + 1 + "," + d.y + 1 + ")"; })
        .style('cursor', 'pointer');

        var img_id = function(d:any){ console.log("hello"+d.data.id);return "img_" + d.data.id; }
        var img_url = function(d:any){ return "url(#img_" + d.data.id + ")"; }
        var defs = node.append("defs")
        var imgPattern = defs
          .append("pattern")
          .attr("id", img_id)
          .attr("width", 1)
          .attr("height", 1)
          .attr("patternUnits", "objectBoundingBox")
          .append("image")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", function(d:any){ return d.r*2;})
          .attr("height", function(d:any){ return d.r*2;})
          .attr("xlink:href", function (d:any) {
          return "https://randomuser.me/api/portraits/women/"+d.data.id+".jpg" ;
          });


      node.append("title")
        .text(function (d: any) { return d.data.className + ": " + format(d.value / 2); });

      node.append("circle")
        .on("click", function (d: any) { router.navigate(['details/' + d.data.id]) })
        .attr("r", function (d: any) { return d.r; })
        .style("fill", img_url);
      // var images = node.append("svg:image")
      // .attr("xlink:href", function (d:any) { return "http://pictify.saatchigallery.com/files/works/fluffy-bird-1465173013_b.jpg";  })
      // .attr("x", function (d) { return 0; })
      // .attr("y", function (d) { return 0; })
      // .style('border-radisus','50%')
      // .attr("height", function(d:any){return d.r;})
      // .attr("width", function(d:any){return d.r;});

      // node.append("text")
      //   .on("click", function (d: any) { router.navigate(['details/' + d.data.id]) })
      //   .attr("dy", ".3em")
      //   .style("text-anchor", "middle")
      //   .style('font-size', '100%')
      //   .text(function (d: any) { return d.data.className.substring(0, d.r / 3); });

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


