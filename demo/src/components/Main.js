import React, { Component } from "react";
import BarUnemolyement from "./BarUnemolyement";
import BarSuicide from "./BarSuicide";
import LineUnemployment from "./LineUnemployment";
import MapUnemployment from "./MapUnemployment";
import MapSuicide from "./MapSuicide";
import ScatterPlot1 from "./ScatterPlot1";
import ZoomCircle from "./ZoomCircle";
import MapBox from "./MapBox";
import Sunburst from "./Sunburst";
import "./../styles/Main.css";



class Main extends Component {
  render() {
    return (
      <>
        <div class="container">
          <div class="row">
            <div id="webTitle">
              <h1>Does the <span id="orange">Unemployment</span> affect <span id="blue">Suicide</span> in the U.S?</h1>
            </div>
            <div id='intro'>
              <p>This project is to explore whether unemployment mainly cause suicide in U.S or not.</p>
              <p>Based on our research, unemployment may or may not be one factor of suicide.
                This web dashboard visualizes Unemployment rate V.S Suicide rate to see if there is a strong correlation between them.</p>
              <p>We use different data visualization techniques to present the data and compare to see whether the states in U.S with hign unemployment rate have coresponding high suicide rate.</p>
              <hr></hr>
            </div>
          </div>

          <div class="row">
            <h2 id='mapTitle'> <span id="orange">Unemployment</span> & <span id="blue">Suicide</span>  Hotspots</h2>
            <div class="col-sm-6">
              <MapUnemployment />
            </div>
            <div class="col-sm-6">
              <MapSuicide />
            </div>
          </div>
          <div id='mapDesc'>
            <p>First, geographical distribution of these two rate among each states, choropleth maps offer a clear presentation between these two rates.</p>
            <p>As we can see, multiple states which have high unemployment rate stay damp color for the suicide rate map. Which means that not all states which high unemployment rate has high sucide rate</p>
          </div>

          <div class="row">
            <h3 id='mapTitle'><span id="brown">View</span> <span id="purple">Our</span> <span id="green">Data</span></h3>
            <div class="col-sm-3">
              <p>We have the unemployment rate and suicide rate for 50 states in U.S for Three years. It's relative unconvinent to show the 50 states' comparsions over three years.</p>
              <p id="sunDesc">This sunburst plot with d3 animation shows a full view of our data from 2014 to 2016, categoried by unemployment rate V.S suicide rate.</p>
              <p id="sunDesc">Click any of the arc component to dive into a specific year to see the comparision between all 50 states propotional to the are area from the pie</p>
            </div>
            <div class="col-sm-1"></div>
            <div class="col-sm-8">
              <Sunburst />
            </div>
          </div>

          <div class="row">
            <h3 id="chartTag">Bar Chart Comparator</h3>
            <div class="col-sm-10">
              <BarUnemolyement />
            </div>

            <div class="col-sm-2">
              <div id='bar1Desc'>
                {/* <h3>Description goes here</h3> */}
                <p>After an overview of data, we can use an interactive bar chart to check the comparision between states for each rate.</p>
                <p>The default setting shows the 50 states' descending comparision.</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-2">
              <div id='bar2Desc'>
                {/* <h3>Description goes here</h3> */}
                <p>By filteing the 10 states with highest/lowest rate, we can easily see that only very few states overlap to each other, which means the states with high suicide rate may not have a high unemployment rate. </p>
              </div>
            </div>

            <div class="col-sm-10">
              <BarSuicide />
            </div>
          </div>

          <div class="row">
            <h3><span id='blue'>Where</span> Are The <span id='orange'>High Rates</span> Located</h3>
            <MapBox />
            <p>The marker in the boxmap shows the states with top 5 suicide rate and unemployment rate, this is very clear that the ornage and blue makers are separated.</p>
            <p>Only one of them overlaps, which means the states with high suicide rate does not have corresponding unemployment rate.</p>
            <hr></hr>
          </div>
          {/* <div class="row">
            <div class="col-sm-6">
              <h3>Line Chart</h3>
              <LineUnemployment />
            </div>
          </div> */}

          <div class="row">
            <div class="col-sm-7">
              <h3 id='chartTag'>Check the <span id='blue'>Correlation</span></h3>
              <ScatterPlot1 />
            </div>
            <div class="col-sm-4">
              <div id='scatterDesc'>
                <p>From the above charts we could get a rough idea that suicide rate may not strong corelate with the unemployment rate.</p>
                <p>Here, we use a scatter plot to check the correlation between them. The year buttom gives us the ability to check data for more than one year.</p>
                <p>The data from 2014 to 2016 all shows a weak correlation between these two rates.</p>
              </div>
            </div>
            <div class="col-sm-1">
            </div>
          </div>

          <div class="row">
            <div class="col-sm-7">
              <h3>There Are Many <span id="navy">Other Factors</span></h3>
              <ZoomCircle />
            </div>
            <div class="col-sm-1"></div>
            <div class="col-sm-4">
              <div id="zoomDesc">
                <p>From above visualization, we found out that Suicide rate is not mainly affected by the Unemployment rate.</p>
                <p>However, we are curious about which factors influence suicide besides unemployment. But we do not find the data that evaluate different factors’ effects on suicide quantatively. </p>
                <p>Thus, we do further research by reading others’ papers and summarize potential factors and generate our own data of other factors effects on suicide to prove this idea by this zoomable circle</p>
                <p>From the data we gathered, there are many other factors contributing to a high suicide rate in U.S. Other factors are more influential than unemployment.</p>
                <p>Therefore, we can draw the conclusion that Suicide is not mainly affected by Unemployment among U.S</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Main;
