import React from 'react';
import * as d3 from 'd3';
import "./../styles/ScatterPlot.css";



const ScatterPlot1 = () => {
    React.useEffect(() => {
        var w = 650;
        var h = 350;
        var margin = {top: 20, right: 20, bottom: 100, left: 100};
        var padding = 30;

        var data2014 = [
            [7.917164179104478, 14.5],
            [9.470555555555556, 18.0],
            [6.968, 17.3],
            [8.820258620689655, 10.5],
            [5.198958333333334, 19.9],
            [6.440625, 9.8],
            [5.897222222222222, 13.2],
            [4.747916666666667, 13.8],
            [5.431628787878788, 20.0],
            [6.951960784313726, 10.5],
            [5.956159420289856, 14.3],
            [4.208670033670034, 12.9],
            [4.022936507936508, 15.7],
            [7.5654861111111105, 15.9],
            [7.244886363636363, 14.3],
            [6.235416666666667, 15.7],
            [6.435069444444444, 9.8],
            [6.233333333333333, 8.2],
            [8.32734939759036, 13.3],
            [4.759195402298851, 12.2],
            [8.973373983739837, 12.5],
            [6.554130434782609, 16.3],
            [4.677827380952381, 23.9],
            [3.0947132616487454, 13.4],
            [7.603431372549019, 19.6],
            [4.233333333333333, 17.8],
            [7.19563492063492, 8.3],
            [7.327777777777778, 21.0],
            [6.311559139784946, 8.1],
            [7.038500000000001, 13.0],
            [3.3124213836477985, 17.8],
            [6.182575757575758, 12.6],
            [4.819805194805195, 19.1],
            [7.862962962962963, 18.6],
            [6.109950248756219, 13.3],
            [7.128333333333333, 10.1],
            [7.592934782608696, 15.2],
            [4.0256313131313135, 17.1],
            [7.613245614035088, 14.1],
            [4.950590551181103, 12.2],
            [4.767816091954023, 20.5],
            [4.522619047619047, 18.7],
            [6.003634085213032, 12.9],
            [7.407692307692308, 15.2],
            [7.521666666666666, 18.1],
            [6.014930555555555, 13.1],
            [4.121739130434782, 20.6]
        ];
        var data2015 = [
            [7.033084577114428, 14.9],
            [8.791666666666666, 18.2],
            [6.016, 19.1],
            [7.563362068965517, 10.3],
            [4.026432291666667, 19.5],
            [5.489583333333333, 9.9],
            [5.044444444444444, 12.6],
            [3.929166666666666, 13.5],
            [4.703219696969697, 22.1],
            [6.155800653594771, 10.3],
            [4.8118659420289855, 14.4],
            [3.677272727272728, 13.9],
            [3.956269841269841, 16.3],
            [6.513611111111112, 17.1],
            [7.3748046875, 15.2],
            [4.916666666666667, 16.0],
            [5.778819444444444, 8.8],
            [5.425595238095238, 8.9],
            [5.9397590361445785, 13.8],
            [4.351245210727969, 13.2],
            [7.71920731707317, 14.0],
            [5.423260869565218, 17.1],
            [4.288988095238095, 25.3],
            [2.877867383512545, 11.7],
            [6.861274509803922, 18.4],
            [3.4225, 16.5],
            [6.051587301587301, 8.3],
            [7.243434343434344, 23.7],
            [5.582258064516129, 7.8],
            [6.4425, 13.4],
            [3.252830188679245, 17.5],
            [5.314583333333333, 13.9],
            [4.746536796536796, 20.3],
            [6.551620370370371, 17.8],
            [5.472636815920398, 14.0],
            [5.528333333333333, 11.2],
            [7.039673913043479, 14.8],
            [3.656439393939394, 20.4],
            [6.737982456140351, 15.7],
            [4.775262467191601, 12.5],
            [4.798563218390805, 22.4],
            [4.214880952380953, 14.8],
            [5.140664160401003, 12.7],
            [6.835683760683761, 15.4],
            [7.743787878787878, 17.4],
            [5.12662037037037, 14.7],
            [4.068840579710145, 28.0]
        ];
        var data2016 = [
            [6.773756218905473, 15.7],
            [7.732777777777779, 17.7],
            [4.656666666666666, 18.2],
            [6.920219435736677, 10.5],
            [3.416145833333333, 20.5],
            [5.128125, 10.1],
            [4.430555555555555, 11.5],
            [3.4145833333333333, 12.1],
            [4.36780303030303, 21.4],
            [6.280800653594771, 10.7],
            [4.615851449275362, 15.4],
            [3.875084175084176, 14.6],
            [3.9787301587301593, 17.9],
            [6.358125, 16.8],
            [7.2244140625, 14.2],
            [4.24375, 15.9],
            [4.909027777777777, 9.4],
            [4.140476190476191, 8.8],
            [5.566566265060241, 13.3],
            [4.571264367816092, 13.2],
            [6.988617886178862, 12.7],
            [5.079782608695653, 18.4],
            [4.418452380952381, 25.9],
            [3.086648745519713, 13.1],
            [5.946078431372549, 21.4],
            [2.7591666666666668, 17.2],
            [5.232539682539683, 7.2],
            [6.930050505050506, 22.5],
            [5.004166666666666, 8.1],
            [5.68875, 13.0],
            [3.5053459119496857, 19.0],
            [5.409848484848485, 14.2],
            [5.304004329004329, 21.0],
            [5.649537037037037, 17.8],
            [5.903731343283583, 14.7],
            [4.944999999999999, 11.2],
            [5.945289855072464, 15.7],
            [3.198358585858586, 20.2],
            [5.419298245614035, 16.3],
            [5.104790026246719, 12.6],
            [4.906896551724138, 21.8],
            [3.732738095238096, 17.3],
            [4.6303884711779455, 13.2],
            [6.911752136752137, 14.9],
            [7.023939393939394, 19.3],
            [4.691087962962963, 14.7],
            [4.969927536231884, 25.2]
        ];



        d3.select('#year14Scatter')
            .on('click', () => {
                gendata(2014);
                toggleFilterYear('#year14Scatter');
            });

        d3.select('#year15Scatter')
            .on('click', () => {
                gendata(2015);
                toggleFilterYear('#year15Scatter');
            });

        d3.select('#year16Scatter')
            .on('click', () => {
                gendata(2016);
                toggleFilterYear('#year16Scatter');
            });


        function toggleFilterYear(id) {
            d3.selectAll('.filterYear')
                .style('background-color', '#eee');
            d3.select(id)
                .style('background-color', '#6aaed6');
        }

        var datagen = function (year) {
            var dataset = [];
            if (year === 2014) {
                dataset = data2014;
            } else if (year === 2015) {
                dataset = data2015;
            } else {
                dataset = data2016;
            }
            return dataset;
        };
        
        var dataset = datagen(2014);

        const xScale = d3.scaleLinear()
            .domain([2, d3.max(dataset, function (d) {
                return d[0];
            })])
            .range([padding, w - padding * 2]);

        console.log(dataset[1]);

        const yScale = d3.scaleLinear()
            .domain([2, 25])
            .range([h - padding, padding]);

        // Define Axis
        var xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(5);
        var yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(5);

        // Create svg element 
        const svg = d3.select('#scatterPlot1')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

        // Create circles
        svg.selectAll('circle')
            .data(dataset)
            .enter()
            .append('circle')
            .attr('cx', function (d) {
                return xScale(d[0]);
            })
            .attr('cy', function (d) {
                return yScale(d[1]);
            })
            .attr('r', 4)
            .attr('fill', '#6aaed6');

        // Create axis
        svg.append('g') // new group element 
            .attr('class', 'x axis')
            //move to bottom
            .attr('transform', 'translate(' + 0 + ',' + (h - padding) + ')')
            .text('Unemployment Rate')
            .call(xAxis);

        svg.append("text")            
            .attr('id', 'plotLabel') 
            .attr("transform",
                  "translate(" + (w/2) + " ," + 
                                 (h - 40) + ")")
            .style("text-anchor", "middle")
            .text("Unemployment Rate")
            .attr("fill","white");

        svg.append('g')
            .attr('class', 'y axis')
            //move left a bit to compensate for padding
            .attr('transform', 'translate(' + padding + ',' + 0 + ')')
            .text('Suicide Rate')
            .call(yAxis);
            
        svg.append("text")
            .attr('id', 'plotLabel')
            .attr("transform", "rotate(-90)")
            .attr("x", -50)
            .attr("y",h / 2-130)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Suicide Rate")
            .attr("fill","white");

        // On click, update with new random data
        function gendata(year) {
            //renew data

            var dataset = datagen(year);

            //console.log(dataset);

            //Update scale domains
            xScale.domain([2, d3.max(dataset, function (d) {
                return d[0];
            })]);
            yScale.domain([2, d3.max(dataset, function (d) {
                return d[1];
            })]);

            //console.log(dataset[0]);

            svg.selectAll('circle')
                .remove();
            // Update all circles
            svg.selectAll('.circle')
                //.remove()
                .data(dataset)
                .enter()
                .append('circle')
                .transition() // Transition 1
                .duration(500)
                //.ease('circle')
                // .each('start', function () {
                //     d3.select(this)
                //         .attr('fill', 'gray')
                //         .attr('r', 2);
                // })
                .attr('cx', function (d) {
                    return xScale(d[0]);
                })
                .attr('cy', function (d) {
                    return yScale(d[1]);
                })
                .transition() // Transition 2, equiv to below
                .duration(500)
                .attr('fill', '#6aaed6')
                .attr('r', 4);

            // Update axis
            svg.select('.x.axis')
                .transition()
                .duration(500)
                .call(xAxis);

            svg.append("text")
                .attr('id', 'plotLabel')             
                .attr("transform",
                      "translate(" + (w/2) + " ," + 
                                     (h - 40) + ")")
                .style("text-anchor", "middle")
                .text("Unemployment Rate")
                .attr("fill","white");

            svg.select('.y.axis')
                .transition()
                .duration(500)
                .call(yAxis);

            svg.append("text")
                .attr('id', 'plotLabel')
                .attr("transform", "rotate(-90)")
                .attr("x", -50)
                .attr("y",h / 2-130)
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Suicide Rate")
                .attr("fill","white");  

        };

    }, [])
    return (
        <>

            <div className="commands">
                <span className="filterYear" id="year14Scatter">2014</span>
                <span className="filterYear" id="year15Scatter">2015</span>
                <span className="filterYear" id="year16Scatter">2016</span>
            </div>
            <div id="scatterPlot1">
                {/* <button type='button' onClick="gendata(2014)">Year 2014</button>
                    <button type='button' onClick="gendata(2015)">Year 2015</button>
                    <button type='button' onClick="gendata(2016)">Year 2016</button> */}
            </div>

        </>
    )
}

export default ScatterPlot1;