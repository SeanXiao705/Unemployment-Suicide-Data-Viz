import React from 'react';
import * as d3 from 'd3';
import './../styles/Bubble.css';
import './../styles/Pie.css';
import data from '../assets/data/circle_data.json';


const ZoomCircle = () => {
  React.useEffect(() => {

    var promises = [];

    promises.push(data);

    Promise.all(promises).then(function (values) {  //🎒 explain:takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises.

      var data = values[0];

      var color = d3.scaleLinear()
        .domain([0, 5])
        .range(["hsl(160,90%)", "hsl(228,80%,50%)"])
        .interpolate(d3.interpolateHcl);

      var width = 932,
        height = width;

      var pack = data => d3.pack()
        .size([width, height])
        .padding(3)
        (d3.hierarchy(data)
          .sum(d => d.size)
          .sort((a, b) => b.size - a.size));
      const root = pack(data);
      // console.log(root)
      let focus = root;
      let view;

      const svg = d3.select("#zoomable_circle_year")
        .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
        .style("display", "block")
        .style("margin", "0 -14px")
        .style("background", "none")
        .style("cursor", "pointer")
        .on("click", (event) => zoom(event, root));

      const node = svg.append("g")
        .selectAll("circle")
        .data(root.descendants().slice(1))
        .join("circle")
        .attr("fill", d => d.children ? color(d.depth) : "white")
        .attr("pointer-events", d => !d.children ? "none" : null)
        .on("mouseover", function () { d3.select(this).attr("stroke", "#000"); })
        .on("mouseout", function () { d3.select(this).attr("stroke", null); })
        .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

      const label = svg.append("g")
        .style("font", "20px sans-serif")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => d.parent === root ? "inline" : "none")
        .text(d => d.data.name);

      zoomTo([root.x, root.y, root.r * 2]);

      function zoomTo(v) {
        const k = width / v[2];

        view = v;

        label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
      }

      function zoom(event, d) {

        focus = d;

        const transition = svg.transition()
          .duration(event.altKey ? 7500 : 750)
          .tween("zoom", d => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => zoomTo(i(t));
          });

        label
          .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
          .transition(transition)
          .style("fill-opacity", d => d.parent === focus ? 1 : 0)
          .on("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
          .on("end", function (d) { if (d.parent !== focus) this.style.display = "none"; });
      }
    });
  }, [])
  return (
    <>
      <svg id="zoomable_circle_year" width="650" height="650"></svg>
    </>
  )
}

export default ZoomCircle;