function multiplelineChart(city){

// set the dimensions and margins of the graph
var margin = {top: 100, right: 111, bottom: 50, left: 40},
    width = 860 - margin.left - margin.right,
    height = 460 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%Y");



// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var transport = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d[city + "Transport"]); });

var domestic = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d[city + "Domestic"]); });

var industry = d3.line()
    .x(function(d) {  return x(d.Year); })
    .y(function(d) { return y(d[city + "Industry"]); });


// append the svg obgect to the body of the page

var svg = d3.select("#multipleline"+city).append("svg")
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
d3.csv("datasets/multipledata.csv", function(error, data) {
  if (error) throw error;



  // format the data
  data.forEach(function(d) {
      d.Year = parseTime(d.Year);
      d[city+"Domestic"] = +d[city+"Domestic"];
      d[city+"Transport"] = +d[city+"Transport"];
      d[city+"Industry"] = +d[city+"Industry"];
  });


  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y.domain([0, d3.max(data, function(d) {
	  return Math.max(d[city + "Domestic"], d[city + "Industry"], d[city + "Transport"]); })]);

  // Add the Y gridlines
    svg.append("g")
        .attr("class", "grid")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat(""));

  // Add the line path.
  svg.append("path")
      .data([data])
      .attr("class", "transport")
      .attr("stroke", "steelblue")
      .attr("d", transport);

  svg.append("path")
      .data([data])
      .attr("class", "domestic")
      .attr("stroke", "red")
      .attr("d", domestic);

  svg.append("path")
      .data([data])
      .attr("class", "industry")
      .attr("stroke", "red")
      .attr("d", industry);

      // LineLabels

    svg.append('g')
    .classed('labels-group', true)
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .filter(function(d, i) { return i === (data.length - 1) })
    .classed('label',true)
    .attr("x", function (d) {
        return x(d.Year)+10;
    })
    .attr("y", function (d) {
        return y(d[city + "Industry"])+4;
    })
    .style('font-family', 'Lato, Arial')
    .style('fill', 'rgb(24, 122, 51)')
    .style('font-size', '14px')
    .text("Industry");

    svg.append('g')
    .classed('labels-group', true)
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .filter(function(d, i) { return i === (data.length - 1) })
    .classed('label',true)
    .attr("x", function (d) {
        return x(d.Year)+10;
    })
    .attr("y", function (d) {
        return y(d[city + "Domestic"])+4;
    })
    .style('font-family', 'Lato, Arial')
    .style('fill', 'rgb(40, 103, 162)')
    .style('font-size', '14px')
    .text("Domestic");

    svg.append('g')
    .classed('labels-group', true)
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .filter(function(d, i) { return i === (data.length - 1) })
    .classed('label',true)
    .attr("x", function (d) {
        return x(d.Year)+10;
    })
    .attr("y", function (d) {
        return y(d[city + "Transport"])+4;
    })
    .style('font-family', 'Lato, Arial')
    .style('fill', 'rgb(173, 46, 18)')
    .style('font-size', '14px')
    .text("Transport");

  var xAxisRight = d3.axisBottom(x)
        .ticks(5);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisRight);

  var yAxisLeft = d3.axisLeft(y)
        .ticks(5);

  // Add the Y Axis
  svg.append("g")

      .attr("class", "y axis")
      .call(yAxisLeft);


      var focus = svg.append("g")
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


              //  title
              svg.append('text')
                  .data(data)
                .attr('x', 1)
                .attr('y', 0 - (margin.top/1.35))
                .attr('text-anchor', 'left')
                .style('font-size', '20px')
                .style('font-weight', 'bold')
                .style('font-family', 'Lato, Arial')
                .style('fill', 'black')
                .text("Who is responsible for polluting in " + city + "?");

              //  subtitle
              svg.append('text')
                  .data(data)
                .attr('x', 1)
                .attr('y', 0 - (margin.top/3))
                .attr('text-anchor', 'left')
                .style('font-size', '15px')
                .style('font-family', 'Lato, Arial')
                .style('fill', 'rgb(128, 131, 129)' )
                .text("Emissions of kilotonnes (kt) of CO2 to the atmosphere");

                //  source
                svg.append('text')
                    .data(data)
                  .attr('x', 1)
                  .attr('y', height + (margin.bottom/1.75))
                  .attr('text-anchor', 'left')
                  .style('font-size', '9px')
                  .style('font-family', 'Lato, Arial')
                  .style('fill', 'rgb(128, 131, 129)' )
                  .text("Sour: Department for Business, Energy & Industrial Strategy");



});

};
multiplelineChart("Anglesey");
multiplelineChart("Cardiff");
multiplelineChart("Swansea");
multiplelineChart("Powys");
multiplelineChart("Denbigshire");
multiplelineChart("Conwy");
multiplelineChart("Newport");
multiplelineChart("Flintshire");
multiplelineChart("Wrexham");
multiplelineChart("Neath");
multiplelineChart("Bridgend");
multiplelineChart("Glamorgan");
multiplelineChart("Monmouthshire");
multiplelineChart("Wales");
multiplelineChart("Gwynedd");
