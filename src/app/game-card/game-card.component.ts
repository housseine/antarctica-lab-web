import { Component, OnInit } from '@angular/core';
import { Game } from '../games/game';
import { GameService } from '../game.service';
import * as d3 from 'd3';
declare function render(): any;


@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  games: Game[];
  constructor(public gameService: GameService) { }

  ngOnInit() {
    this.getGame();
    // this.makechart();

  }


  getGame(): void {
    this.gameService.getGames().subscribe(games => this.games = games);
  }

  ngAfterContentInit() {
    this.makechart();
  }
  makechart() {


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


    d3.json("assets/mockdata.json").then(function (data) {

      var root = d3.hierarchy(classes(data))
        .sum(function (d: any) { return d.value; })
        .sort(function (a, b) { return b.value - a.value; });

      bubble(root);
      var node = svg.selectAll(".node")
        .data(root.children)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d: any) { return "translate(" + d.x + "," + d.y + ")"; })
        .on("click", function () { alert("works") })
        .style('cursor', 'pointer');

      svg.append("style").text(".bubble{margin:auto;display:block;}");

      node.append("title")
        .text(function (d: any) { return d.data.className + ": " + format(d.value); });

      node.append("circle")
        .attr("r", function (d: any) { return d.r; })
        .style("fill", function (d: any) {
          return color(d.data.packageName);
        });

      node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function (d: any) { return d.data.className.substring(0, d.r / 3); });
    });

    // Returns a flattened hierarchy containing all leaf nodes under the root.
    function classes(root) {
      var classes = [];

      function recurse(name, node) {
        if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });
        else classes.push({ packageName: name, className: node.name, value: node.size });
      }

      recurse(null, root);
      return { children: classes };
    }

    d3.select(self.frameElement).style("height", diameter + "px");
  }
}


