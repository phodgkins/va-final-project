/*
 * BubblePlot - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the  
 */

var gates = [];

BubblePlot = function (_parentElement, _data) {

	this.parentElement = _parentElement;
	this.data = _data;

	// DEBUG RAW DATA
	// console.log(this.data);

	this.initVis();
}

BubblePlot.prototype.initVis = function () {
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

	// Scales and axes
    vis.x = d3.scaleLinear()
		.range([0, vis.width - 100])
		.domain([0, 200]);

	vis.y = d3.scaleLinear()
		.range([vis.height, 0])
        .domain([0,200]);

    vis.z = d3.scaleLinear()
        .range([5,10])
        .domain([0, 2000])

    var tickLabelsX = ["East", " ", "West"]
	vis.xAxis = d3.axisBottom()
		.scale(vis.x)
        .ticks(2)
		.tickFormat((d,i) => tickLabelsX[i]);

    var tickLabelsY = ["North", " ", "South"]
	vis.yAxis = d3.axisLeft()
		.scale(vis.y)
        .ticks(2)
		.tickFormat((d,i) => tickLabelsY[i]);

	vis.svg.append("g")
		.attr("class", "x-axis axis")
		.attr("transform", "translate(0," + vis.height + ")");

	vis.svg.append("g")
		.attr("class", "y-axis axis");


    var bubbleColor = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(["Entrances", "Ranger Stops", "Gates", "General Gates", "Camping"])
    


	// Tooltip placeholder
	vis.tooltip = vis.svg.append("text")
		.attr("class", "focus")
		.attr("x", 20)
		.attr("y", 0)
		.attr("dy", ".35em");



    gates = ["Entrances", "Ranger Stops", "Gates", "General Gates", "Camping"]
    vis.updateVis(gates, 0, 13);



}

BubblePlot.prototype.updateVis = function (gates, monthStart, monthEnd) {
    var bubbleColor = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(["Entrances", "Ranger Stops", "Gates", "General Gates", "Camping"])

	var vis = this;
	
	var bubbles = vis.svg.selectAll("*").remove();
	vis.svg.selectAll("*").remove();
	
	vis.svg.append("g")
		.attr("class", "x-axis axis")
		.attr("transform", "translate(0," + vis.height + ")");

	vis.svg.append("g")
		.attr("class", "y-axis axis");

    var bubbles = vis.svg.selectAll("dot")
        .data(vis.data);

        bubbles.enter().append("circle")
        .attr("cx", function (d) {
            var numGates = d3.set(gates).size();
            for (i = 0; i < numGates; i++) {
                if (d.gateType == gates[i]) {
                    return vis.x(d.gateX);
                }
            } 
        } )
        .attr("cy", function (d) { 
            var numGates = d3.set(gates).size();
            for (i = 0; i < numGates; i++) {
                if (d.gateType == gates[i]) {
                    return vis.y(d.gateY);
                }
            } 
        } )
        .attr("r", function (d) { 
            var numGates = d3.set(gates).size();
            for (i = 0; i < numGates; i++) {
                if (d.gateType == gates[i]) {
                    console.log(d.gateType)
                    var monthTotals = [d.M1, d.M2, d.M3, d.M4, d.M5, d.M6, d.M7, d.M8, d.M9, d.M10, d.M11, d.M12, d.M13];
                    var sum = 0;
                    for (j = monthStart; j < monthEnd; j++) {
                        sum += monthTotals[j]
                    }
                    return vis.z(sum);
                }
            } 
        } )
        .merge(bubbles)
        .style("fill", function (d) { return bubbleColor(d.gateType); } )
        .style("opacity", "0.7")
        .attr("stroke", "white")
        .style("stroke-width", "2px")
		// Update tooltip text
		.on("mouseover", function (d, i) {
		    vis.tooltip.text(d.gateName, 100);
		})
		.on("mouseout", function (d) {
			vis.tooltip.text("");
		});
		bubbles.exit().remove();


    var size = 20
	vis.svg.selectAll("mydots")
  		.data(bubbleColor.domain())
  		.enter()
  		.append("rect")
   	 		.attr("x", vis.width - 125)
    		.attr("y", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
    		.attr("width", size)
    		.attr("height", size)
    		.style("fill", function(d){ return bubbleColor(d)})
	
	vis.svg.selectAll("mylabels")
  		.data(bubbleColor.domain())
  		.enter()
  		.append("text")
    		.attr("x", vis.width - 125 + size*1.2)
    		.attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
    		.style("fill", function(d){ return bubbleColor(d)})
    		.text(function(d){ return d})
    		.attr("text-anchor", "left")
    		.style("alignment-baseline", "middle")


	// Call axis functions with the new domain 
	vis.svg.select(".x-axis").call(vis.xAxis);
	vis.svg.select(".y-axis").call(vis.yAxis);
}