import React from 'react';
import * as d3 from 'd3';
import "./../styles/UnemploymentBar.css";
import data from '../assets/data/dataset.csv';


const ResponsiveBar1 = () => {
    React.useEffect(() => {
        // d3.csv(data, function(data) { console.log(data); });

        var margin = { top: 20, left: 75, bottom: 50, right: 50 },
            width = 900 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        var svg = d3.select('#chart1').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        var x = d3.scaleBand();
        var y = d3.scaleLinear();

        var delay = function (d, i) {
            return i * 50;
        };

        var all, closer, farther, year14, year15, year16;
        var current, sortMode, filterMode;

        d3.csv(data, d => {
            return {
                state: d.state,
                rate: d.unemployment_rate,
                year: d.year,
            };
        }).then(data => {
            all = data.filter(d => d['year'] == 2016).sort((a, b) => d3.ascending(a.rate, b.rate));

            closer = all.slice(0, 10);
            farther = all.slice(-10,);

            filter('#all');
            sort('#descending');

            toggleFilter('#all');
            toggleSort('#descending');

            draw();
        });

        d3.select('#ascending')
            .on('click', () => {
                sort('#ascending');
                transition();
                toggleSort('#ascending');
                redraw();
            });

        d3.select('#descending')
            .on('click', () => {
                sort('#descending');
                transition();
                toggleSort('#descending');
                redraw();
            });


        d3.select('#all')
            .on('click', () => {
                filter('#all');
                sort(sortMode);
                toggleSort(sortMode);
                toggleFilter('#all');
                redraw();
            });

        d3.select('#closer')
            .on('click', () => {
                filter('#closer');
                sort(sortMode);
                toggleSort(sortMode);
                transition();
                toggleFilter('#closer');
                redraw();
            });

        d3.select('#farther')
            .on('click', () => {
                filter('#farther');
                sort(sortMode);
                toggleSort(sortMode);
                transition();
                toggleFilter('#farther');
                redraw();
            });

        function filter(mode) {
            if (mode === '#all') {
                current = JSON.parse(JSON.stringify(all));
                // current.sort((a, b) => d3.ascending(a.state, b.state));
            } else if (mode === '#closer') {
                current = JSON.parse(JSON.stringify(closer));
                // current.sort((a, b) => d3.ascending(a.rate, b.rate));
            } else if (mode === '#farther') {
                current = JSON.parse(JSON.stringify(farther));
                // current.sort((a, b) => d3.descending(a.rate, b.rate));
            }
            filterMode = mode;
        }

        function sort(mode) {
            if (mode === '#ascending') {
                // current = JSON.parse(JSON.stringify(all));
                current.sort((a, b) => d3.ascending(a.rate, b.rate));
            } else if (mode === '#descending') {
                // current = JSON.parse(JSON.stringify(all));
                current.sort((a, b) => d3.descending(a.rate, b.rate));
            }
            x.domain(current.map(d => d.state));
            sortMode = mode;
        }

        function toggleSort(id) {
            d3.selectAll('.sort')
                .style('background-color', '#eee');
            d3.select(id)
                .style('background-color', '#fd8d3c');
        }

        function toggleFilter(id) {
            d3.selectAll('.filter')
                .style('background-color', '#eee');
            d3.select(id)
                .style('background-color', '#fd8d3c');
        }

        function redraw() {
            //update scale
            x.domain(current.map(d => d.state));
            ////////////////////////////////
            // DATA JOIN FOR BARS.
            var bars = svg.selectAll('.bar')
                .data(current, d => d.state);

            // UPDATE.
            bars.transition()
                .duration(750)
                .delay(delay)
                .attr('x', d => x(d.state))
                .attr('width', x.bandwidth());

            // ENTER.
            bars.enter()
                .append('rect')
                .attr('x', d => x(d.state))
                .attr('y', d => y(0))
                .attr('width', x.bandwidth())
                .transition()
                .duration(750)
                .attr('class', 'bar')
                .attr('x', d => x(d.state))
                .attr('y', d => y(d.rate))
                .attr('width', x.bandwidth())
                .attr('height', d => height - y(d.rate));

            // EXIT.
            bars.exit()
                .transition()
                .duration(750)
                .style('opacity', 0)
                .remove();

            ////////////////////////////////
            // DATA JOIN FOR NAMES.
            var name = svg.selectAll('.name')
                .data(current, d => d.state);

            // UPDATE.
            name.transition()
                .duration(750)
                .delay(delay)
                .attr('x', (d, i) => x(d.state) + x.bandwidth() / 2);

            // ENTER.
            name.enter()
                .append('text')
                .attr('x', d => x(d.state) + x.bandwidth() / 2)
                .attr('y', d => y(d.rate) + (height - y(d.rate)) / 2)
                .style('opacity', 0)
                .transition()
                .duration(1000)
                .text(d => d.state)
                .attr('class', 'name')
                // .attr('style', d => d.state === 'EARTH' ? 'fill: red' : '')
                .attr('x', d => x(d.state) + x.bandwidth() / 2)
                .attr('y', d => y(d.rate) + (height - y(d.rate)) / 2)
                .style('opacity', 1);

            // EXIT.
            name.exit()
                .transition()
                .duration(750)
                .style('opacity', 0)
                .remove();
        }

        function transition() {
            var transition = svg.transition()
                .duration(750);

            transition.selectAll('.bar')
                .delay(delay)
                .attr('x', d => x(d.state));

            transition.selectAll('.name')
                .delay(delay)
                .attr('x', d => x(d.state) + x.bandwidth() / 2);
        }

        function draw() {
            x.domain(current.map(d => d.state))
                .range([0, width])
                .paddingInner(0.2);

            y.domain([0, d3.max(current, d => d.rate)])
                .range([height, 0]);

            svg.selectAll('.bar')
                .data(current, d => d.state)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', d => x(d.state))
                .attr('y', d => y(d.rate))
                .attr('width', x.bandwidth())
                .attr('height', d => height - y(d.rate));

            svg.selectAll('.name')
                .data(current, d => d.state)
                .enter()
                .append('text')
                .text(d => d.state)
                .attr('class', 'name')
                .attr('x', d => x(d.state) + x.bandwidth() / 2)
                .attr('y', d => y(d.rate) + (height - y(d.rate)) / 2);

            var xAxis;
            xAxis = d3.axisBottom()
                .scale(x)
                .ticks(0)
                .tickSize(0)
                .tickFormat('');

            svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis);

            var yAxis = d3.axisLeft()
                .scale(y)
                .ticks(5, 'd');

            svg.append('g')
                .attr('class', 'axis')
                .call(yAxis);

            svg.append('text')
                .attr('x', - height / 2)
                .attr('y', - margin.left * 0.7)
                .attr('transform', 'rotate(-90)')
                .attr('class', 'ylabel')
                .append('tspan').text('Unemployment Rate (%)')
                //   .append('tspan').text('-2')
                .style('baseline-shift', 'super')
                .style('font-size', '1.5em')
                .style('fill','white');
        }
    }, [])
    return (
        <>
            <div className="commands">
                <span className="filter" id="all">all</span>
                <span className="filter" id="farther">Top 10</span>
                <span className="filter" id="closer">Botton 10</span>
            </div> 

            <div className="commands">
                <span className="sort" id="ascending">ascending</span>
                <span className="sort" id="descending">descending</span>
            </div>

            <div id="chart1"></div>
            
        </>
    )
}

export default ResponsiveBar1;