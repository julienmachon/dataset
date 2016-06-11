'use strict';

import d3 from 'd3';

// import CSV
d3.csv('/cycle-9-6-2016.csv')
.row(d => {
    return {
      accelerometerX: d.ACCELEROMETER_X, 
      accelerometerY: d.ACCELEROMETER_Y, 
      accelerometerZ: d.ACCELEROMETER_Z, 
      speed: d.LOCATION_Speed,
      date: new Date(d.Date)
    };
})
.get((error, data) => {
  const WIDTH = 1000;
  const HEIGHT = 500;
  const MARGINS = {
    top: 20, 
    right: 20, 
    bottom: 20, 
    left: 40
  }

  let vis = d3.select('#visualisation');
  let xScale = d3.time.scale().rangeRound([MARGINS.left, WIDTH - MARGINS.right]).domain([data[0].date,data[data.length-1].date]);
  let yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,40]);
  let xAxis = d3.svg.axis().scale(xScale);
  let yAxis = d3.svg.axis().scale(yScale).orient("left");
  let lineGen = d3.svg.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.speed));

  vis.append("svg:g")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);

  vis.append("svg:g")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);

  vis.append('svg:path')
    .attr('d', lineGen(data))
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
});
