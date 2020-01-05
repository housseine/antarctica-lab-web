import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../games/game';
import * as d3 from 'd3';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  private searchTerms = new Subject<string>();
  games: Game[];

  constructor(public gameService: GameService, private router: Router) {
  }
  ngOnInit() {
    this.getGames();
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.gameService.searchGames(term)))
      .subscribe((games) => {
        if (games.length != 0) {
          this.makechart(games, this.router);
        } else {
          this.getGames();
        }
      })
  }
  search(term: string): void {
    this.searchTerms.next(term);
  }

  getGames(): void {
    this.gameService.getGames().subscribe(games => { this.games = games; this.makechart(games, this.router); });
  }
  makechart(data, router) {

    var diameter = 960,
      format = d3.format(",d"),
      color = d3.scaleOrdinal(d3.schemeAccent);
    var bubble = d3.pack()
      .size([diameter, diameter])
      .padding(1.5);

    d3.select("svg").remove();
    var svg = d3.select("app-game-card").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

    data = fromJsonToDsJson(data);

    var root = d3.hierarchy(classes(data))
      .sum(function (d) { return d.value; })
    // .sort(function (a, b) { return b.value - a.value; });
    bubble(root);
    var node = svg.selectAll(".node")
      .data(root.children)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) { return "translate(" + d.x  + "," + d.y + ")"; })
      .style('cursor', 'pointer');

    var img_id = function (d: any) { return "img_" + d.data.id; }
    var img_url = function (d: any) { return "url(#img_" + d.data.id + ")"; }
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
      .attr("width", function (d: any) { return d.r * 2; })
      .attr("height", function (d: any) { return d.r * 2; })
      .attr("xlink:href", function (d: any) {
        return "https://randomuser.me/api/portraits/women/" + d.data.id + ".jpg";
      });

    node.append("title")
      .text(function (d) { return d.data.className + ": " + format(d.value); });

    node.append("circle")
      .on("click", function (d) { router.navigate(['details/' + d.data.id]) })
      .attr("r", function (d) { return d.r; })
      .style("fill", img_url);
    // var images = node.append("svg:image")
    //   .attr("xlink:href", function (d) { return "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_spiderman.png"; })
    //   .attr("x", function (d) { return -d.r; })
    //   .attr("y", function (d) { return -d.r; })
    //   .attr("height", function (d) { return d.r * 2; })
    //   .attr("width", function (d) { return d.r * 2; });

    node.append("text")
      .on("click", function (d) { router.navigate(['details/' + d.data.id]) })
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function (d) { return d.data.className.substring(0, d.r / 3); });


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

    d3.select(self.frameElement).style("height", diameter + "px");

    function fromJsonToDsJson(data) {
      var dataJson = { "children": data };
      return dataJson;
    }
  }

}
