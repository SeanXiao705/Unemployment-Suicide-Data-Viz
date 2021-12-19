# Interactive Web Based Infographic using React & D3.js

## Contributor:
- Yuqi Xiao 
- Chengyuan Zhou 
- Qiyun Zhang 

## Artifacts

- [Project proposal](https://docs.google.com/presentation/d/1cB0JrvI5U3nOxrUkpIp-883hFKTC_MImkMKn5pJJO54/edit#slide=id.gefcaec33f6_1_936)
- Final presentation: [Transcript](presentation/TRANSCRIPT.md) | [slides](presentation/presentation.pdf)
- Paper: [Overleaf read-only link](https://www.overleaf.com/read/qxwvrhrhpqhm) | [PDF](paper/paper.pdf)
- [Demo link](https://seanxiao705.github.io/react-app/)
- Video [Transcript](video/TRANSCRIPT.md) | [YouTube link](https://www.youtube.com/watch?v=Hi2SwmHb26Y)\



## Project Summary
Suicide became a serious issues in recent years. With the break-out ofCovid-19, many people lost their job and became unemployment. We want toexplore if there is any relationship between this two issues, specifically, whethersuicide is mainly caused by unemployment in U.S or not. 
Many previous works focused on analyzing the correlations and the potentialcauses but lack the proper visualizations to display the result. Some papers dida great job displaying the information but lack the careful analysis that followthe logic of their visualization part. We will combine the advantages of thesework by linking the analysis and visualizations to provide insights from a newperspective.We also aim to explore the result of the research question in an user-friendlyway, so that people even with no data science background can understand it. In this case, we developed a web-based app to provide with data vividly and various graphs following the research logic.





# Visualizations created in the Demo

## Check-list of required visualizations
| Requirement                            | Label        | Done |
| -------------------------------------- | ------------ | ---- |
| responsive d3 chart                    | responsive   | DONE |
| interactive d3 chart                   | interactive  | DONE |
| d3 chart with an animated transition   | animated     | DONE |
| d3 layout                              | layout       | DONE |
| d3 map                                 | map          | DONE |
| Mapbox map                             | mapbox       | DONE |

## Table of visualizations used by page
| Page name | Chart description | Libraries used | Requirement label |
| --------- | ----------------- | -------------- | ----------------- |
| Main page | map unemployment  | d3, topojson   | map               |
| Main page | map suicide       | d3, topojson   | map               |
| Main page | mapbox            | d3, mapbox API | mapbox            |
| Main page | bar uneployment   | d3             | interactive chart |
| Main page | bar suicide       | d3             | responsive chart  |
| Main page | Sunburst chart    | d3             | d3 layout         |
| Main page | Sunburst chart    | d3             | d3 animation      |
| Main page | Scatter Plot      | d3             | interactive chart |
| Main page | Zoomable Circle   | d3             | d3 animation      |

## Summary table of visualization forms used
| Type             | Count |
| ---------------- | ----- |
| Choropleth Map   | 2     |
| MapBox           | 1     |
| Bar Chart        | 2     |
| Scatter Plot     | 1     |
| Zoomable Circle  | 1     |
|  Sunburst Chart  | 1     |

