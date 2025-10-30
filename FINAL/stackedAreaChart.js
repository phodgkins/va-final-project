/*
 * StackedAreaChart - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the  
 */

StackedAreaChart = function (_parentElement, _data) {

	this.parentElement = _parentElement;
	this.data = _data;

	// DEBUG RAW DATA
	// console.log(this.data);

	this.initVis();
}



/*
 * Initialize visualization (static content, e.g. SVG area or axes)
 */

StackedAreaChart.prototype.initVis = function () {
	var vis = this;

	vis.margin = { top: 40, right: 0, bottom: 60, left: 60 };

	vis.width = 800 - vis.margin.left - vis.margin.right,
		vis.height = 400 - vis.margin.top - vis.margin.bottom;


	// SVG drawing area
	vis.svg = d3.select("#" + vis.parentElement).append("svg")
		.attr("width", vis.width + vis.margin.left + vis.margin.right)
		.attr("height", vis.height + vis.margin.top + vis.margin.bottom)
		.append("g")
		.attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

	// Overlay with path clipping
	vis.svg.append("defs").append("clipPath")
		.attr("id", "clip")
		.append("rect")
		.attr("width", vis.width)
		.attr("height", vis.height);

	// Scales and axes
    vis.x = d3.scaleLinear()
		.range([0, vis.width])
		.domain(d3.extent(vis.data, function (d) { return d.Month; }));

	vis.y = d3.scaleLinear()
		.range([vis.height, 0]);

	var tickLabels = ["May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May"]
	vis.xAxis = d3.axisBottom()
		.scale(vis.x)
		.ticks(13)
		.tickFormat((d,i) => tickLabels[i]);

	vis.yAxis = d3.axisLeft()
		.scale(vis.y);

	vis.svg.append("g")
		.attr("class", "x-axis axis")
		.attr("transform", "translate(0," + vis.height + ")");

	vis.svg.append("g")
		.attr("class", "y-axis axis");

	// Get data categories
	var dataCategories = colorScale.domain();

	// Initialize stack layout
	vis.stack = d3.stack()
		.keys(dataCategories);

	// Stack data
	vis.stackedData = vis.stack(vis.data);

	// Stacked area layout
	vis.area = d3.area()
		.x(function (d) { return vis.x(d.data.Month); })
		.y0(function (d) { return vis.y(d[0]); })
		.y1(function (d) { return vis.y(d[1]); });

	// Basic area layout
	vis.basicArea = d3.area()
		.x(function (d) { return vis.x(d.data.Month); })
		.y0(vis.height)
		.y1(function (d) { return vis.y(d[1] - d[0]); });


	// Tooltip placeholder
	vis.tooltip = vis.svg.append("text")
		.attr("class", "focus")
		.attr("x", 20)
		.attr("y", 0)
		.attr("dy", ".35em");


	// (Filter, aggregate, modify data)
	vis.updateVis();
}

/*
 * The drawing function - should use the D3 update sequence (enter, update, exit)
 * Function parameters only needed if different kinds of updates are needed
 */

StackedAreaChart.prototype.updateVis = function () {
	var vis = this;
	
	var dataCategories = colorScale.domain();
	vis.svg.selectAll("*").remove();
	
	vis.stack = d3.stack()
		.keys(dataCategories);

	vis.stackedData = vis.stack(vis.data);
	
	vis.svg.append("g")
		.attr("class", "x-axis axis")
		.attr("transform", "translate(0," + vis.height + ")");

	vis.svg.append("g")
		.attr("class", "y-axis axis");

	// Update y domain
    vis.y.domain([0, d3.max(vis.stackedData, function (d) {
		return d3.max(d, function (e) {
		    return e[1];
		});
	})
	]);
	

	// Draw the layers
	var categories = vis.svg.selectAll(".area")
	    .data(vis.stackedData);

	categories.enter().append("path")
		.attr("class", "area")
		.merge(categories)
		.style("fill", function (d, i) {
		    return colorScale(dataCategories[i]);
		})
		.attr("d", function (d) {
		    return vis.area(d);
		})
		// Update tooltip text
		.on("mouseover", function (d, i) {
		    vis.tooltip.text(dataCategories[i], 100);
		})
		.on("mouseout", function (d) {
			vis.tooltip.text("");
		});

    var size = 20
	vis.svg.selectAll("mydots")
  		.data(dataCategories)
  		.enter()
  		.append("rect")
   	 		.attr("x", vis.width - 150)
    		.attr("y", function(d,i){ return 10 + i*(size+5)})
    		.attr("width", size)
    		.attr("height", size)
    		.style("fill", function(d){ return colorScale(d)})
    vis.svg.selectAll("mydots").exit().remove();
	
	vis.svg.selectAll("mylabels")
  		.data(dataCategories)
  		.enter()
  		.append("text")
    		.attr("x", vis.width - 150 + size*1.2)
    		.attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)})
    		.style("fill", function(d){ return colorScale(d)})
    		.text(function(d){ return d})
    		.attr("text-anchor", "left")
    		.style("alignment-baseline", "middle")
    vis.svg.selectAll("mylabels").exit().remove();

	categories.exit().remove();

	// Call axis functions with the new domain 
	vis.svg.select(".x-axis").call(vis.xAxis);
	vis.svg.select(".y-axis").call(vis.yAxis);
}
