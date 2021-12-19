import React from 'react';
import * as d3 from 'd3';
import "./../styles/SuicideBar.css";
import data from '../assets/data/dataset.csv';


const ResponsiveBar2 = () => {
    React.useEffect(() => {
        // d3.csv(data, function(data) { console.log(data); });

        var margin = { top: 20, left: 75, bottom: 50, right: 50 },
            width = 900 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        var svg = d3.select('#chart2').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        var x = d3.scaleBand();
        var y = d3.scaleLinear();

        var delay = function (d, i) {
            return i * 50;
        };

        var all, closer, farther;
        var current, sortMode, filterMode;

        d3.csv(data, d => {
            return {
                state: d.state,
                rate2: d.death_rate / 10,
                year: d.year,
            };
        }).then(data => {

            all = data.filter(d => d['year'] == 2016).sort((a, b) => d3.ascending(a.rate, b.rate));
            closer = all.slice(0, 10);
            farther = all.slice(-10,);

            filter('#all2');
            sort('#ascending2');

            toggleFilter('#all2');
            toggleSort('#ascending2');
            draw();
        });

        //sort value by asc/desc order
        d3.select('#ascending2')
            .on('click', () => {
                sort('#ascending2');
                transition();
                toggleSort('#ascending2');
                redraw();
            });

        d3.select('#descending2')
            .on('click', () => {
                sort('#descending2');
                transition();
                toggleSort('#descending2');
                redraw();
            });


        d3.select('#all2')
            .on('click', () => {
                filter('#all2');
                sort(sortMode);
                toggleSort(sortMode);
                toggleFilter('#all2');
                redraw();
            });

        d3.select('#closer2')
            .on('click', () => {
                filter('#closer2');
                sort(sortMode);
                toggleSort(sortMode);
                transition();
                toggleFilter('#closer2');
                redraw();
            });

        d3.select('#farther2')
            .on('click', () => {
                filter('#farther2');
                sort(sortMode);
                toggleSort(sortMode);
                transition();
                toggleFilter('#farther2');
                redraw();
            });


        function filter(mode) {
            if (mode === '#all2') {
                current = JSON.parse(JSON.stringify(all));
            } else if (mode === '#closer2') {
                current = JSON.parse(JSON.stringify(closer));
            } else if (mode === '#farther2') {
                current = JSON.parse(JSON.stringify(farther));
            }
            filterMode = mode;
        }



        function sort(mode) {
            if (mode === '#ascending2') {
                // current = JSON.parse(JSON.stringify(all));
                current.sort((a, b) => d3.ascending(a.rate2, b.rate2));
            } else if (mode === '#descending2') {
                // current = JSON.parse(JSON.stringify(all));
                current.sort((a, b) => d3.descending(a.rate2, b.rate2));
            }
            x.domain(current.map(d => d.state));
            sortMode = mode;
        }

        function toggleSort(id) {
            d3.selectAll('.sort2')
                .style('background-color', '#eee');
            d3.select(id)
                .style('background-color', '#6aaed6');
        }


        function toggleFilter(id) {
            d3.selectAll('.filter2')
                .style('background-color', '#eee');
            d3.select(id)
                .style('background-color', '#6aaed6');
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
                .attr('y', d => y(d.rate2))
                .attr('width', x.bandwidth())
                .attr('height', d => (height - y(d.rate2)));

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
                .attr('y', d => y(d.rate2) + (height - y(d.rate2)) / 2)
                .style('opacity', 0)
                .transition()
                .duration(1000)
                .text(d => d.state)
                .attr('class', 'name')
                // .attr('style', d => d.state === 'EARTH' ? 'fill: red' : '')
                .attr('x', d => x(d.state) + x.bandwidth() / 2)
                .attr('y', d => y(d.rate2) + (height - y(d.rate2)) / 2)
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

            y.domain([0, d3.max(current, d => d.rate2)])
                .range([height, 0]);

            svg.selectAll('.bar')
                .data(current, d => d.state)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', d => x(d.state))
                .attr('y', d => y(d.rate2))
                .attr('width', x.bandwidth())
                .attr('height', d => height - y(d.rate2));

            svg.selectAll('.name')
                .data(current, d => d.state)
                .enter()
                .append('text')
                .text(d => d.state)
                .attr('class', 'name')
                .attr('style', d => d.state === 'EARTH' ? 'fill: red' : '')
                .attr('x', d => x(d.state) + x.bandwidth() / 2)
                .attr('y', d => y(d.rate2) + (height - y(d.rate2)) / 2);

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
                .append('tspan').text('Suicide Rate/10 (%)')
                //   .append('tspan').text('-2')
                .style('baseline-shift', 'super')
                .style('font-size', '1.5em')
                .style('fill', 'white');
        }
    }, [])
    return (
        <>

            <div className="commands">
                <span className="filter2" id="all2">all</span>
                <span className="filter2" id="farther2">Top 10</span>
                <span className="filter2" id="closer2">Bottom 10</span>

            </div>

            <div className="commands">
                <span className="sort2" id="ascending2">ascending</span>
                <span className="sort2" id="descending2">descending</span>
            </div>

            <div id="chart2"></div>
        </>
    )
}

export default ResponsiveBar2;