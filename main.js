// Your browser will call the onload() function when the document
// has finished loading. In this case, onload() points to the
// start() method we defined below. Because of something called
// function hoisting, the start() method is callable on line 6
// even though it is defined on line 8.
window.onload = start;

// This is where all of our javascript code resides. This method
// is called by "window" when the document (everything you see on
// the screen) has finished loading.
function start() {
    // Select the graph from the HTML page and save
    // a reference to it for later.
    var graph = document.getElementById('graph');

    // Specify the width and height of our graph
    // as variables so we can use them later.
    // Remember, hardcoding sucks! :)
    var width = 800;
    var height = 500;

    // Here we tell D3 to select the graph that we defined above.
    // Then, we add an <svg></svg> tag inside the graph.
    // On the <svg> element, we set the width and height.
    // Then, we save the reference to this element in the "svg" variable,
    // so we can use it later.
    // 
    // So our code now looks like this in the browser:
    // <svg width="700" height="600">
    // </svg>
    var svg = d3.select(graph)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Remember, "svg" now references to <svg width="700" height="600"></svg>
    // So now we append a group <g></g> tag to our svg element, and return a
    // reference to that and save it in the "bars" variable.
    // 
    // Now bars looks like this:
    // <g></g>
    // 
    // And the svg element in our browser looks like this:
    // <svg width="700" height="600">
    //  <g></g>
    // </svg>
    var bars = svg.append('g');

    // Our bar chart is going to encode the letter frequency as bar width.
    // This means that the length of the x axis depends on the length of the bars.
    // The y axis should contain A-Z in the alphabet (ordinal data).
    var xScale = d3.scale.linear().range([width - 10, 0]);
    var yScale = d3.scale.ordinal().rangeRoundBands([0, height], 0.3);


    // Tell D3 to create a y-axis scale for us, and orient it to the left.
    // That means the labels are on the left, and tick marks on the right.
    var yAxis = d3.svg.axis().scale(yScale).orient('left');
    var xAxis = d3.svg.axis().scale(xScale).orient('bottom');


    // Add a button below the graph. Clicking on this button will
    // run a filter on the data and use an animation in the process.
    // 
    // Our HTML will now look like this:
    // <div id="graph">
    //  <svg width="700" height="600">...</svg>
    //  <p>
    //    <button>Filter Data</button>
    //  </p>
    // </div>
//    d3.select(graph)
//        .append('p')
//        .append('button')
//        .text('Filter Data')
//        .style('margin-bottom', '15px')
//        .on('click', function() {
//            bars.selectAll('.bar')
//                .filter(function(d) {
//                    return d.frequency >= eval(cutoff.property("value"));
//                })
//                .transition()
//                .duration(function(d) {
//                    return Math.random() * 1000;
//                })
//                .delay(function(d) {
//                    return d.frequency * 8000
//                })
//                .style('fill', sel.property("value"));
//
//            bars.selectAll('.bar')
//                .filter(function(d) {
//                   return d.frequency < eval(cutoff.property("value"));
//                })
//                .transition()
//                .duration(function(d) {
//                   return Math.random() * 1000;
//                })
//                .delay(function(d) {
//                   return d.frequency * 8000
//                })
//                .style('fill', 'white');
//        });
//
//    d3.select(graph)
//        .select('p')
//        .append('br');
//
//    // Add a button below the graph. Clicking on this button will
//    // reset the filter on the data and use an animation in the process.
//    d3.select(graph)
//        .select('p')
//        .append('button')
//        .attr('display', 'inline-block')
//        .style('margin-bottom', '15px')
//        .text('Reset Filter')
//        .on('click', function() {
//            bars.selectAll('.bar')
//                .filter(function(d) {
//                    return d.frequency;
//                })
//                .transition()
//                .duration(function(d) {
//                    return Math.random() * 1000;
//                })
//                .delay(function(d) {
//                    return d.frequency * 8000
//                })
//                .style('fill', 'steelblue')
//                .attr('width', function(d) {
//                    return xScale(d.frequency);
//                });
//        });

    // D3 will grab all the data from "data.csv" and make it available
    // to us in a callback function. It follows the form:
    // 
    // d3.csv('file_name.csv', accumulator, callback)
    // 
    // Where 'file_name.csv' - the name of the file to read
    // accumulator - a method with parameter d that lets you pre-process
    //               each row in the CSV. This affects the array of
    //               rows in the function named 'callback'
    //
    // callback - a method with parameters error, data. Error contains
    //            an error message if the data could not be found, or
    //            was malformed. The 'data' parameter is an array of
    //            rows returned after being processed by the accumulator.
    
    // Get Data
    
        
    console.log("hello");
    
    d3.csv('data.csv', drawPlot);
    
    function drawPlot(rawData) {
        
//        var data2 = rawData[0];
//        var k = Object.keys(data2);
        var data = [];
        var directors = [];
        
    
        rawData.forEach(function(d) {

            if (directors.includes(d.director_name)) {
                var i = directors.indexOf(d.director_name);
                var dir = data[i];
                data[i].movie_amount = data[i].movie_amount + 1;
                data[i].totalprofit = +data[i].totalprofit + +d.gross - (+d.budget);
                data[i].totalprofit = +data[i].total_likes + +d.director_facebook_likes;
                data[i].total_cast_likes = +data[i].total_cast_likes + +d.cast_total_facebook_likes;
                data[i].total_movie_likes = +data[i].total_movie_likes + +d.movie_facebook_likes;
                data[i].avg_imdb_score = +data[i].avg_imdb_score + +d.imdb_score;
                
            } else {
                data.push( {"name": d.director_name, "totalprofit": +d.gross - +d.budget, "movie_amount": 1, "total_likes": +d.director_facebook_likes, "total_cast_likes": +d.cast_total_facebook_likes, "total_movie_likes": +d.movie_facebook_likes, "avg_imdb_score": +d.imdb_score });
                directors.push(d.director_name);
            }
            
            
            
        });
        
        
        
        
        
        
        
        
        
        
        
        
        
   // var profit = d3.sum(data, d=> d.gross);
    
    
    
//    d3.csv('data.csv', function(d) {
//        d.frequency = +d.frequency;
//        return d;
//    }, function(error, data) {
        // We now have the "massaged" CSV data in the 'data' variable.
        
        // We set the domain of the xScale. The domain includes 0 up to
        // the maximum frequency in the dataset. This is because 
        xScale.domain([0, d3.max(data, function(d) {
            return d.total_likes;
        })]);

        // We set the domain of the yScale. The scale is ordinal, and
        // contains every letter in the alphabet (the letter attribute
        // in our data array). We can use the map function to iterate
        // through each value in our data array, and make a new array
        // that contains just letters.
        yScale.domain(data.map(function(d) {
            return d.director;
        }));
//        yScale.domain([0, d3.max(data, function(d) {
//            return d.directo;
//        })]);

        // Append the y-axis to the graph. the translate(20, 0) stuff
        // shifts the axis 20 pixels from the left. This just helps us
        // position stuff to where we want it to be.
        bars.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(20, 0)')
            // Call is a special method that lets us invoke a function
            // (called 'yAxis' in this case) which creates the actual
            // yAxis using D3.
            .call(yAxis);
        
        // position stuff to where we want it to be.
        bars.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, 480)')
            // Call is a special method that lets us invoke a function
            // (called 'yAxis' in this case) which creates the actual
            // yAxis using D3.
            .call(xAxis);

        // Create the bars in the graph. First, select all '.bars' that
        // currently exist, then load the data into them. enter() selects
        // all the pieces of data and lets us operate on them.
        var xcalc = [30, -1];
        
        function updatex(x) {
            if (xcalc[1] <= 20) {
                xcalc[1] = xcalc[1] + 1;
            } else {
                xcalc[0] = xcalc[0] + 20;
                xcalc[1] = 0;
            }
            return xcalc[0];
        }
        
        var ycalc = [10, -1];
        
        function updatey(x) {
            if (ycalc[1] <= 20) {
                ycalc[0] = ycalc[0] + 20;
                ycalc[1] = ycalc[1] + 1;
            } else {
                ycalc[0] = 30;
                ycalc[1] = 0;
            }
            console.log(ycalc);
            return ycalc[0];
        }
        
        
        
        bars.append('g')
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('circle')
            .attr("stroke", "black")
            .attr('class', 'bar')
//            .attr('x', 30)
            .attr('cx', function() {
                return updatex(true);
            })
//            .attr('y', function(d) {
//                return yScale(d.letter);
//            })
            .attr('cy', function() {
                return updatey(false);
            })
            .attr("r", 5)
//             .attr('width', 15)
// //            .attr('width', function(d) {
// //                // xScale will map any number and return a number
// //                // within the output range we specified earlier.
// //                return xScale(d.frequency);
// //            })
//             .attr('height', 15)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("click", function(d,i){
                console.log(d.name);
                });
        
        // Create Event Handlers for mouse
      function handleMouseOver(d, i) {  // Add interactivity

            // Use D3 to select element, change color and size
            d3.select(this).attr({
              fill: "orange",
              r: 10
            });

            // Specify where to put label of text
            svg.append("text").attr({
               id: "test-" + d.name[0] + i,  // Create an id for text so we can select it later for removing on mouseout
                x: function() { return 30; },
                y: function() { return 20; }
            })
            .text(function() {
                d3.select("#Name").text(d.name)
                d3.select("#Likes").text(d.total_likes)
                d3.select("#Movies").text(d.movie_amount)
                d3.select("#Profit").text(d.totalprofit)
                //return d.name;  // Value of the text

            });
          }

      function handleMouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this).attr({
              fill: "black",
              r: 5
            });
            // Select text by id and then remove
            d3.select("#test-" + d.name[0] + i).remove();  // Remove text location
          }
        
        
//            .attr('height', function(d) {
//                // Remember how we set the yScale to be an ordinal scale
//                // with bands from 0 to height? And then we set the domain 
//                // to contain all the letters in the alphabet? 
//                return yScale.rangeBand();
//            });
//    });

    // Add a button below the graph. Clicking on this button will
    // run a filter on the data and use an animation in the process.
    //
    // Our HTML will now look like this:
    // <div id="graph">
    //  <svg width="700" height="600">...</svg>
    //  <p>
    //    <button>Filter Data</button>
    //  </p>
    // </div>

//    d3.select(graph)
//        .select('p')
//        .append('br');
//
//    var sel = d3.select(graph)
//        .select('p')
//        .append('select');
//
//    sel.append('option')
//        .text('Red');
//
//    sel.append('option')
//        .text('Purple');
//
//    sel.append('option')
//        .text('Green');
//
//    d3.select(graph)
//            .select('p')
//            .append('br');
//
//    var cutoff = d3.select(graph)
//        .append('p')
//        .text("Cutoff: ")
//        .append('input')
//        .attr('class', 'cutoff')
//        .attr('type','text')
//        .attr('value','0.8');

//    function getSelectedOption(sel) {
//                            var opt;
//                            for ( var i = 0, len = sel.options.length; i < len; i++ ) {
//                                opt = sel.options[i];
//                                if ( opt.selected === true ) {
//                                    break;
//                                }
//                            }
//                            return opt;
//                        };
//    var val = cutoff.value;
//
//    console.log(cutoff.attr("value"));
//    console.log(document.getElementsByClassName("cutoff").value);

}}

//tab code
function changeLikes(evt, likeType) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(likeType).style.display = "block";
    evt.currentTarget.className += " active";
}