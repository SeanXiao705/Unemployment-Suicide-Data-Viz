import React from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import data from '../assets/data/data_after_cleaning.json';
import us from '../assets/data/states-albers-10m.json';


const MapUnemployment = () => {
    React.useEffect(() => {
        function legend({
            color,
            title,
            tickSize = 6,
            width = 320,
            height = 44 + tickSize,
            marginTop = 18,
            marginRight = 0,
            marginBottom = 16 + tickSize,
            marginLeft = 0,
            ticks = width / 64,
            tickFormat,
            tickValues
        } = {}) {  //🎒 explain:set up the stysle of svg, and then set up the svg with its attributes

            const svg = d3.create("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [0, 0, width, height])
                .style("overflow", "visible")
                .style("display", "block");

            let x;

            // Continuous
            if (color.interpolator) {
                x = Object.assign(color.copy()
                    .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
                    { range() { return [marginLeft, width - marginRight]; } });

                svg.append("image")
                    .attr("x", marginLeft)
                    .attr("y", marginTop)
                    .attr("width", width - marginLeft - marginRight)
                    .attr("height", height - marginTop - marginBottom)
                    .attr("preserveAspectRatio", "none");
                    // .attr("xlink:href", ramp(color.interpolator()).toDataURL());

                //scaleSequentialQuantile doesn’t implement ticks or tickFormat.
                if (!x.ticks) {
                    if (tickValues === undefined) {
                        const n = Math.round(ticks + 1);
                        tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
                    }
                    if (typeof tickFormat !== "function") {
                        tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
                    }
                }
            }

            //discrete
            else if (color.invertExtent) {
                const thresholds
                    = color.thresholds ? color.thresholds() // scaleQuantize
                        : color.quantiles ? color.quantiles() // scaleQuantile
                            : color.domain(); // scaleThreshold

                const thresholdFormat
                    = tickFormat === undefined ? d => d
                        : typeof tickFormat === "string" ? d3.format(tickFormat)
                            : tickFormat;

                x = d3.scaleLinear()
                    .domain([-1, color.range().length - 1])
                    .rangeRound([marginLeft, width - marginRight]);

                svg.append("g")
                    .selectAll("rect")
                    .data(color.range())
                    .join("rect")
                    .attr("x", (d, i) => x(i - 1))
                    .attr("y", marginTop)
                    .attr("width", (d, i) => x(i) - x(i - 1))
                    .attr("height", height - marginTop - marginBottom)
                    .attr("fill", d => d);

                tickValues = d3.range(thresholds.length);
                tickFormat = i => thresholdFormat(thresholds[i], i);
            }

            svg.append("g")
                .attr("transform", `translate(0, ${height - marginBottom})`)
                .call(d3.axisBottom(x)
                    .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
                    .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
                    .tickSize(tickSize)
                    .tickValues(tickValues))
                .call(g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height))
                .call(g => g.select(".domain").remove())
                .call(g => g.append("text")
                    .attr("y", marginTop + marginBottom - height - 6)
                    .attr("fill", "white")
                    .attr("text-anchor", "start")
                    .attr("font-weight", "bold")
                    .style("font-size", "20px")

                    .text(title));

            return svg.node();
        }


        /////////////////////////////////////////////////////////////
        //Choropleth code
        var promises = [];

        promises.push(us);
        promises.push(data);

        //console.log(promises);
        //console.log(us);

        



        Promise.all(promises).then(function (values) {  //🎒 explain:takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises.
        var us = values[0];
        var data = values[1];

        console.log(values)


        //console.log(us);
        //console.log(data);

            const format = d => `${d}%`

            const path = d3.geoPath()

            const color = d3.scaleQuantize([3, 8], d3.schemeOranges[5])

            data = Object.assign(new Map(data.map((d) => [d.state_full_name, +d.unemployment_rate,+d.year])));
            data.title = "Unemployment Rate (%)";


            const svg = d3.select("#Mapchart1")
                .attr("viewBox", [0, 0, 975, 610]);

            svg.append("g")
                .attr("transform", "translate(610,20)")
                .append(() => legend({ color, title: data.title, width: 260 }));

            svg.append("g")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .join("path")
                .attr("fill", d => color(data.get(d.properties.name)))
                .attr("d", path)
                .append("title")
                .text(d => `${d.properties.name}
        ${format(data.get(d.properties.name))}`);
            console.log()

            svg.append("path")
                .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
                .attr("fill", "none")
                .attr("stroke", "white")
                .attr("stroke-linejoin", "round")
                .attr("d", path);

            });		



    }, [])
    return (
        <>
            <svg id="Mapchart1"></svg>
        </>
    )
}

export default MapUnemployment;