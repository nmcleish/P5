window.onload = start;

function start() {
    // Select the graph from the HTML page and save
    // a reference to it for later.
    var graph = document.getElementById('graph');

    // Specify the width and height of our graph
    // as variables so we can use them later.
    // Remember, hardcoding sucks! :)
    var width = 750;
    var height = 550;

    var svg = d3.select(graph)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    var svg2 = d3.select(graph2)
        .append('svg2')
        .attr('width', 400)
        .attr('height', height);

    var bars = svg.append('g');
    
    var set = [];

    // Our bar chart is going to encode the letter frequency as bar width.
    // This means that the length of the x axis depends on the length of the bars.
    // The y axis should contain A-Z in the alphabet (ordinal data).
    var xScale = d3.scale.linear().range([width - 50, 0]);
    var yScale = d3.scale.ordinal().rangeRoundBands([0, height-100], 0.3);


    // Tell D3 to create a y-axis scale for us, and orient it to the left.
    // That means the labels are on the left, and tick marks on the right.
    var yAxis = d3.svg.axis().scale(yScale).orient('left');
    var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
    
    console.log("hello");
    
//    var defs = svg.append("defs");
//
//    //Append a linearGradient element to the defs and give it a unique id
//    var linearGradient = defs.append("linearGradient")
//    .attr("id", "linear-gradient
//          
//    linearGradient
//    .attr("x1", 20)
//    .attr("y1", 30)
//    .attr("x2", 40)
//    .attr("y2", 50);
    
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
                data[i].total_likes = +data[i].total_likes + +d.director_facebook_likes;
                data[i].total_cast_likes = +data[i].total_cast_likes + +d.cast_total_facebook_likes;
                data[i].total_movie_likes = +data[i].total_movie_likes + +d.movie_facebook_likes;
                data[i].avg_imdb_score = +data[i].avg_imdb_score + +d.imdb_score;
                data[i].movie_titles = data[i].movie_titles + "/" + (d.movie_title.substring(0,d.movie_title.length-2) + "~" + d.gross + "~" + d.budget +
                "~" + (d.gross - (+d.budget)) + "~" + d.genres+ "~" + d.imdb_score)
                
            } else {
                data.push( {"name": d.director_name, "totalprofit": +d.gross - +d.budget, 
                "movie_amount": 1, "total_likes": +d.director_facebook_likes, "total_cast_likes": +d.cast_total_facebook_likes, 
                "total_movie_likes": +d.movie_facebook_likes, "avg_imdb_score": +d.imdb_score, 
                "movie_titles":(d.movie_title.substring(0,d.movie_title.length-2) + "~" + d.gross + "~" + d.budget + "~" + (d.gross - (+d.budget)) + "~" + d.genres
                + "~" + d.imdb_score) });
                directors.push(d.director_name);
            }
            
            
            
        });
        
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
//        bars.append('g')
//            .attr('class', 'y axis')
//            .attr('transform', 'translate(80, 10)')
//            // Call is a special method that lets us invoke a function
//            // (called 'yAxis' in this case) which creates the actual
//            // yAxis using D3.
//            .call(yAxis);
        
        svg.append('line')
        .attr('x1', 30)
        .attr('x2', 710)
        .attr('y1', 470)
        .attr('y2', 470)
        .attr('stroke', 'black')
        .attr('stroke-width', '.6');
        
        svg.append('line')
        .attr('x1', 20)
        .attr('x2', 20)
        .attr('y1', 460)
        .attr('y2', 10)
        .attr('stroke', 'black')
        .attr('stroke-width', '.6');
        
        svg.append('text')
        .text("High")
        .attr('x', 40)
        .attr('y', 488)
        .attr("font-size", "14px")
        .attr("font-family", "sans-serif");
        
        svg.append('text')
        .text("Mid")
        .attr('x', 360)
        .attr("font-size", "14px")
        .attr('y', 488)
        .attr("font-family", "sans-serif");
        
        svg.append('text')
        .text("Low")
        .attr('x', 670)
        .attr('y', 488)
        .attr("font-size", "14px")
        .attr("font-family", "sans-serif");

        var title = svg.append('text')
        .text(" Profit Margin (USD)")
        .attr('x', width/2 - 80)
        .attr('y', 520)
        .attr("font-size", "20px")
        .attr("font-family", "sans-serif");
        
        var max_profit = 0;
        data.forEach(function(d) { 
        if (max_profit < (d.totalprofit/d.movie_amount)) {
            max_profit = (d.totalprofit/d.movie_amount)
        }});
        
        
        var min_profit = 0;
        data.forEach(function(d) { 
        if (min_profit > (d.totalprofit/d.movie_amount)) {
            min_profit = (d.totalprofit/d.movie_amount);
        }});

        var xcalc = [40, -1];
        
        function updatex(x) {
            if (xcalc[1] <= 20) {
                xcalc[1] = xcalc[1] + 1;
            } else {
                xcalc[0] = xcalc[0] + 20;
                xcalc[1] = 0;
            }
            return xcalc[0];
        }
        
        var ycalc = [5, -1];
        
        function updatey(x) {
            if (ycalc[1] <= 20) {
                ycalc[0] = ycalc[0] + 20;
                ycalc[1] = ycalc[1] + 1;
            } else {
                ycalc[0] = 25;
                ycalc[1] = 0;
            }
            return ycalc[0];
        }

        data.sort(function(x, y){
            return d3.descending(x.totalprofit/ x.movie_amount, y.totalprofit/ y.movie_amount);
            });
        
        function updateColor(value) {
            var col = 0;
            if (value >= 0) {
                col = 255 * (1- (value/ max_profit)) - 40;
                
                return d3.rgb(Math.abs(col), 255, Math.abs(col));
            } else {
                col = 255* (1- (value / min_profit)) - 40;
                
                return d3.rgb(255, Math.abs(col), Math.abs(col));
            }
            
        }
        var div = d3.select("body").append("div")   
            .attr("class", "tooltip")               
            .style("opacity", 0);
        
        
        bars.append('g')
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('circle')
            .attr("stroke", "black")
            .attr("fill", function(d) {
                return updateColor(d.totalprofit/d.movie_amount);
                })
            .attr('class', 'bar')
//            .attr('x', 30)
            .attr('cx', function() {
                return updatex(true);
            })
            .attr('cy', function() {
                return updatey(false);
            })
            .attr("r", 5)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("click", function(d){
                svg2.selectAll("*").remove();
                svg2.append('text')
                    .text("Name:")
                    .attr("font-size", "14px")
                    .attr("font-family", "sans-serif");
                svg2.append('text')
                    .text(d.name)
                    .attr("font-size", "14px")
                    .attr("font-family", "sans-serif");
                var movies = d.movie_titles.split("/")

                for (movie in movies) {
                    var movieInfo = movies[movie].split("~")
                    svg2.append('br')
                    svg2.append('br')


                    svg2.append('text')
                    .text("Movie Title: ")
                    .attr("font-size", "14px")
                    .attr("font-family", "sans-serif");
                    
                    svg2.append('text')
                    .text(movieInfo[0])
                    .attr("font-size", "14px")
                    .attr("font-family", "sans-serif");

                    svg2.append('br')

                    svg2.append('text')
                    .text("Gross: ")
                    .attr("font-size", "14px")
                    .attr("font-family", "sans-serif");
                
                    svg2.append('text')
                    .text(movieInfo[1])
                    .attr("font-size", "14px")
                    .attr("font-family", "sans-serif");

                    svg2.append('br')

                    svg2.append('text')
                    .text("Budget: ")
                    .attr("font-size", "14px")
                    .attr("font-family", "sans-serif");
                
                    svg2.append('text')
                    .text(movieInfo[2])
                    .attr("font-size", "14px")
                    .attr("font-family", "sans-serif");

                    svg2.append('br')

                    svg2.append('text')
                    .text("Net Income: ")
                    .attr("font-size", "14px")
                    .attr("font-family", "sans-serif");
                
                    svg2.append('text')
                    .text(movieInfo[3])
                    .attr("font-size", "14px")
                    .attr("font-family", "sans-serif");

                    svg2.append('br')

                    svg2.append('text')
                    .text("Genres: ")
                    .attr("font-size", "14px")
                    .attr("font-family", "sans-serif");
                
                    svg2.append('text')
                    .text(movieInfo[4])
                    .attr("font-size", "14px")
                    .attr("font-family", "sans-serif");

                    svg2.append('br')

                    svg2.append('text')
                    .text("IMDB Score: ")
                    .attr("font-size", "14px")
                    .attr("font-family", "sans-serif");
                
                    svg2.append('text')
                    .text(movieInfo[5])
                    .attr("font-size", "14px")
                    .attr("font-family", "sans-serif");
                
                }
                });
        
        // Create Event Handlers for mouse
      function handleMouseOver(d, i) {  // Add interactivity

        div.transition()        
        .duration(200)      
        .style("opacity", .9);      
        div .html("Director: "+ d.name + "</br>" + "Likes: "+ d.total_likes + "</br>" + "Movies: "+ d.movie_amount + "</br>" + "Avg Profit: "+ d.totalprofit/ d.movie_amount)  
        .style("left", (d3.event.pageX+ 20) + "px")     
        .style("top", (d3.event.pageY - 70) + "px"); 

            // Use D3 to select element, change color and size
            d3.select(this)
            .attr({
                fill: function(d) {
                    return updateColor(d.totalprofit);
                    },
              r: 10
            })
          }
        
        


      function handleMouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            div.transition()        
                .duration(500)      
                .style("opacity", 0); 
            d3.select(this).attr({
                fill: function(d) {
                    return updateColor(d.totalprofit/d.movie_amount);
                },
              r: 5
            })

          }
        
        

}}

        
function openFilter(event, filter) {
            console.log("filter");
    
    }
//        set.sort(function(x, y){
//            return d3.descending(x.total_movie_likes/ x.movie_amount, y.total_movie_likes/ y.movie_amount);
//            });
//        
//        d3.selectAll('.bar')
//            .data(set)
//            .enter()
//            .append('circle')
//            .attr("stroke", "black")
//            .attr("fill", function(d) {
//                return updateColor(d.totalprofit/d.movie_amount);
//                })
//            .attr('class', 'bar')
////            .attr('x', 30)
//            .attr('cx', function() {
//                return updatex(true);
//            })
//            .attr('cy', function() {
//                return updatey(false);
//            })
//            .attr("r", 5)
//            .on("mouseover", handleMouseOver)
//            .on("mouseout", handleMouseOut)
//            .on("click", function(d,i){
//                console.log(d.name);
//                });
        


    
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