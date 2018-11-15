

    // Get the data
    d3.csv("datasets/ArriaFinalWalesOnly.csv", function(error, data) {
      if (error) throw error;

      data = data.sort(function (a, b) {
                  return d3.descending(a.kgSavedperHA, b.kgSavedperHA);
              })

    var margin = {top: 100, right: 111, bottom: 50, left: 120},
        width = 860 - margin.left - margin.right,
        height = 460 - margin.top - margin.bottom;


    var svgbar = d3.select("#barforest").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")




console.log(data);
var x = d3.scaleLinear()
    .range([0, width])
    .domain([0, d3.max(data, function (d) {
        return d.kgSavedperHA;
    })]);

var y = d3.scaleBand()
    .rangeRound([0, height])
    .padding(0.1)
    .domain(data.map(function (d) {
        return d.LocalAuthority;
    }));

    // Add the X Axis
    var xAxisRight = d3.axisBottom(x)
          .ticks(5);

    svgbar.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisRight);

    var yAxisRight = d3.axisLeft(y)
          .ticks(5);

    // Add the Y Axis
    svgbar.append("g")
        .attr("class", "y axis")
        .call(yAxisRight);


var bars = svgbar.selectAll(".bar")
    .data(data)
    .enter()
    .append("g")

//append rects
bars.append("rect")
    .attr("class", "bar")
    .attr("width", function (d) {
        return x(d.kgSavedperHA)
      })
    .attr("y", function (d) {
        return y(d.LocalAuthority)
    })
    .attr("height", y.bandwidth());


//add a value label to the right of each bar
bars.append("text")
    .attr("class", "label")
    .style('font-family', 'Lato, Arial')
    .style('fill', 'rgb(247, 240, 242)')
    .style('font-size', '12px')
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
        return y(d.LocalAuthority) + y.bandwidth() / 2 + 4;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function (d) {
        return x(d.kgSavedperHA)-29;
    })
    .text(function (d) {
        return d.kgSavedperHA;
    });

    //  title
    svgbar.append('text')
        .data(data)
      .attr('x', 1)
      .attr('y', 0 - (margin.top/1.35))
      .attr('text-anchor', 'left')
      .style('font-size', '20px')
      .style('font-weight', 'bold')
      .style('font-family', 'Lato, Arial')
      .style('fill', 'black')
      .text("How much pollution removes vegetation?");

    //  subtitle
    svgbar.append('text')
        .data(data)
      .attr('x', 1)
      .attr('y', 0 - (margin.top/3))
      .attr('text-anchor', 'left')
      .style('font-size', '15px')
      .style('font-family', 'Lato, Arial')
      .style('fill', 'rgb(128, 131, 129)' )
      .text("Kilograms of pollutants removed per hectare");

      //  source
      svgbar.append('text')
          .data(data)
        .attr('x', 1)
        .attr('y', height + (margin.bottom/1.75))
        .attr('text-anchor', 'left')
        .style('font-size', '9px')
        .style('font-family', 'Lato, Arial')
        .style('fill', 'rgb(128, 131, 129)' )
        .text("Source: Department for Business, Energy & Industrial Strategy");


});
