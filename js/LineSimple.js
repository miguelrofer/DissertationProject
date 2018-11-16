function lineChart(city){

// set the dimensions and margins of the graph
var margin = {top: 100, right: 111, bottom: 50, left: 20},
    width = 860 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%Y");
var bisectDate = d3.bisector(function(d) { return d.Year; }).left;
var formatValue = d3.format(",");
var dateFormatter = d3.timeFormat("%Y");


// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d[city]); });

// append the svg obgect to the body of the page

var svg1 = d3.select("#simpleline"+city).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");



    // gridlines in y axis function
    function make_y_gridlines() {
      return d3.axisLeft(y)
        .ticks(5)
    }

// Get the data
d3.csv("datasets/datafirstgraph.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.Year = parseTime(d.Year);
      d[city] = +d[city];
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y.domain([0, d3.max(data, function(d) { return d[city];})]);

  // Add the Y gridlines
    svg1.append("g")
        .attr("class", "grid")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat(""));

  // Add the valueline path.
  svg1.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  var xAxisRight = d3.axisBottom(x)
        .ticks(5);

  // Add the X Axis
  svg1.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisRight);

  var yAxisRight = d3.axisRight(y)
        .ticks(5);

  // Add the Y Axis
  svg1.append("g")
      .attr("transform", "translate(" + width +" 0 )")
      .attr("class", "y axis")
      .call(yAxisRight);


      var focus = svg1.append("g")
                  .attr("class", "focus")
                  .style("display", "none");



              focus.append("rect")
                  .attr("class", "tooltip")
                  .attr("width", 100)
                  .attr("height", 50)
                  .attr("x", 10)
                  .attr("y", -22)
                  .attr("rx", 4)
                  .attr("ry", 4);

              focus.append("line")
                  .attr("class", "x-hover-line hover-line")
                  .attr("y1", 0)
                  .attr("y2", height);

              focus.append("line")
                  .attr("class", "y-hover-line hover-line")
                  .attr("x1", width)
                  .attr("x2", width);

              focus.append("circle")
                  .attr("r", 5);

              focus.append("text")
                  .attr("class", "tooltip-date")
                  .attr("x", 18)
                  .attr("y", -2);

              focus.append("text")
                  .attr("x", 18)
                  .attr("y", 18)
                  .text("CO2:");

              focus.append("text")
                  .attr("class", "tooltip-likes")
                  .attr("x", 60)
                  .attr("y", 18);

              svg1.append("rect")
                  .attr("class", "overlay")
                  .attr("width", width)
                  .attr("height", height)
                  .on("mouseover", function() { focus.style("display", null); })
                  .on("mouseout", function() { focus.style("display", "none"); })
                  .on("mousemove", mousemove);

              function mousemove() {
                  var x0 = x.invert(d3.mouse(this)[0]),
                      i = bisectDate(data, x0, 1),
                      d0 = data[i - 1],
                      d1 = data[i],
                      d = x0 - d0.Year > d1.Year - x0 ? d1 : d0;
                  focus.attr("transform", "translate(" + x(d.Year) + "," + y(d[city]) + ")");
                  focus.select(".tooltip-date").text(dateFormatter(d.Year));
                  focus.select(".tooltip-likes").text(formatValue(d[city]));
                  focus.select(".x-hover-line").attr("y2", height - y(d[city]));
                  focus.select(".y-hover-line").attr("x2", width + width);
              }

              //  title
              svg1.append('text')
                  .data(data)
                .attr('x', 1)
                .attr('y', 0 - (margin.top/1.35))
                .attr('text-anchor', 'left')
                .style('font-size', '20px')
                .style('font-weight', 'bold')
                .style('font-family', 'Lato, Arial')
                .style('fill', 'black')
                .text("How is" + city + "doing?");

              //  subtitle
              svg1.append('text')
                  .data(data)
                .attr('x', 1)
                .attr('y', 0 - (margin.top/3))
                .attr('text-anchor', 'left')
                .style('font-size', '15px')
                .style('font-family', 'Lato, Arial')
                .style('fill', 'rgb(128, 131, 129)' )
                .text("Emissions of kilotonnes (kt) of CO2 to the atmosphere");

                //  source
                svg1.append('text')
                    .data(data)
                  .attr('x', 1)
                  .attr('y', height + (margin.bottom/1.75))
                  .attr('text-anchor', 'left')
                  .style('font-size', '9px')
                  .style('font-family', 'Lato, Arial')
                  .style('fill', 'rgb(128, 131, 129)' )
                  .text("Source: Department for Business, Energy & Industrial Strategy");


});

};
lineChart("Anglesey");
lineChart("Cardiff");
lineChart("Swansea");
lineChart("Powys");
lineChart("Denbigshire");
lineChart("Conwy");
lineChart("Newport");
lineChart("Flintshire");
lineChart("Wrexham");
lineChart("Neath");
lineChart("Bridgend");
lineChart("Glamorgan");
lineChart("Monmouthshire");
lineChart("Wales");
lineChart("Gwynedd");
