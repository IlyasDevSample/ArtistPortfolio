/**
 * this event is for the show more nav links on scroll down on desktop view
 * 
 * 
 * @event scroll 
 */
window.addEventListener('scroll', function() {
    let headerNav = document.querySelector('.nav-links');
    headerNav.classList.toggle('nav-scroll', window.scrollY > 0);
    var limit = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    
    if(limit-200 < window.scrollY){
        headerNav.classList.toggle('nav-scroll', false);
    }
    
})

const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const toggleBtn = document.querySelector('.toggle-btn');

let bool = false;
/**
 * this event is for the toggle button on mobile view
 * 
 * 
 * @event click 
 */
toggleBtn.addEventListener('click', function() {
    bool = !bool;
    closeBtn.style.display = bool ? 'inline-block' : 'none';
    openBtn.style.display = bool ? 'none' : 'inline-block';
})

const navLinks = document.querySelector('.nav-links');

toggleBtn.addEventListener('click', function() {
    navLinks.classList.toggle('height-auto');
})

/**
 * this function is for the slider of albumes
 */
function makeSlider() {
    let slider = tns({
        container: '.slider-container-box',
        items: 3,
        mouseDrag: true,
        loop: false,
        nav: false,
        center: true,
        controlsContainer: "#custom-control",
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1024: {
                items: 3
            }},
        
    })

    document.getElementById('custom-control').style.display = 'flex';
}
makeSlider();



let datasetArt;

let xhr = new XMLHttpRequest();
let url = 'dataset-music.json';
/**
 * this function is for fetching the data from the json file
 * @param {string} url
 */
xhr.open('GET', url, true);
xhr.onload = function() {
    if (this.status == 200) {
        let data = JSON.parse(this.responseText);
        // console.log(data);
        datasetArt = data;
        result(datasetArt);
        fillAlbumesWithData(data);
        putdata(data)
        putdata2(data)
    }
}
xhr.send();

/**
 * this function is for the Latest Release sliders it will 
 * take the data from the json file and put it in the sliders container
 * 
 * @param {string} albumeName  the name of the albume
 * @param {string} releases  the date of the release
 * @param {string} label  the label of the albume
 * @param {string} format  the format of the albume
 * @param {string} download  the download link of the albume
 * @param {string} certification  the certification of the albume
 * @param {string} picture  the picture of the albume
 */

function createElements(albumeName,releases,label,format,download,certification,picture) {

    let container = document.querySelector('.slider-container-box');

    let div = document.createElement('div');
    div.classList.add('albume-box');
    let img = document.createElement('img');
    img.src = picture;
    img.alt = 'album ' + albumeName;
    let h1 = document.createElement('h1');
    h1.innerHTML = albumeName;
    let p1 = document.createElement('p');
    p1.innerHTML = 'Releases: ' + releases;
    let p2 = document.createElement('p');
    p2.innerHTML = 'Label: ' + label;
    let p3 = document.createElement('p');
    p3.innerHTML = 'Format: ' + format;
    let p4 = document.createElement('p');
    p4.innerHTML = 'Download: ' + download;
    let p5 = document.createElement('p');
    p5.innerHTML = 'Certification: ' + certification;

    div.appendChild(img);
    div.appendChild(h1);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    div.appendChild(p5);
    container.appendChild(div);    
}
/**
 * this function is giving the data to the function createElements
 * 
 * @param {object} data 
 * @param {string} yearin 
 */
function result(data, yearin = '2022') {
    for (let i = 0; i < data.artists[0].albums.length; i++) {
        if (data.artists[0].albums[i].year === yearin) {
            let albumsData = data.artists[0].albums[i];
            createElements(albumsData.name, albumsData.relese, albumsData.label, 
                albumsData.format, albumsData.download, albumsData.certificate, albumsData.picture);
        }

        makeSlider();
    }
}

let selectYear = document.getElementById('year-select');
/**
 * this event is for the select option of the albumes
 * @event change
 */
selectYear.addEventListener('change', function() {
    let yearselected = this.value;
    document.querySelector('.slider-container-box').innerHTML = '';
    result(datasetArt, yearselected);

    
    makeSlider();
    
})


let selectAlbume = document.getElementById('select-albume');

let songTitleMainVideo = document.getElementById('song-title-main-video');
let duration = document.getElementById('duration');
let totalWatch = document.getElementById('total-watch');
let mainPicture = document.getElementById('main-pic');

let songTitleTopVideo = document.getElementById('top-video-title');
let durationTopVideo = document.getElementById('duration-top-video');
let totalWatchTopVideo = document.getElementById('total-watch-top-video');
let industryTopVidio = document.getElementById('industry-top-vidio');
let topPicture = document.getElementById('top-pic');

let songTitlemiddleVideo = document.getElementById('middle-video-title');
let durationmiddleVideo = document.getElementById('duration-middle-video');
let totalWatchmiddleVideo = document.getElementById('total-watch-middle-video');
let industrymiddleVidio = document.getElementById('industry-middle-vidio');
let middlePicture = document.getElementById('middle-pic');

let songTitleLastVideo = document.getElementById('last-video-title');
let durationLastVideo = document.getElementById('duration-last-video');
let totalWatchLastVideo = document.getElementById('total-watch-last-video');
let industryLastVidio = document.getElementById('industry-last-vidio');
let lastPicture = document.getElementById('last-pic');
/**
 * this function is for the filling the songs data in the Latest Videos section
 * 
 * @param {object} albumeSelected  the selected albume songs
 */
function fillBoxes(albumeSelected) {
    for (let i = 0; i < datasetArt.artists[0].albums.length; i++) {
        let albume = datasetArt.artists[0].albums[i];
        if (albume.name === albumeSelected) {
            // console.log(albume.tracks[0]);
            songTitleMainVideo.innerHTML = albume.tracks[0].name;
            duration.innerHTML = albume.tracks[0].duration;
            totalWatch.innerHTML = albume.tracks[0].views;
            mainPicture.src = albume.tracks[0].image;

            songTitleTopVideo.innerHTML = albume.tracks[1].name;
            durationTopVideo.innerHTML = albume.tracks[1].duration;
            totalWatchTopVideo.innerHTML = albume.tracks[1].views;
            industryTopVidio.innerHTML = albume.tracks[1].industry;
            topPicture.src = albume.tracks[1].image;

            songTitlemiddleVideo.innerHTML = albume.tracks[2].name;
            durationmiddleVideo.innerHTML = albume.tracks[2].duration;
            totalWatchmiddleVideo.innerHTML = albume.tracks[2].views;
            industrymiddleVidio.innerHTML = albume.tracks[2].industry;
            middlePicture.src = albume.tracks[2].image;

            songTitleLastVideo.innerHTML = albume.tracks[3].name;
            durationLastVideo.innerHTML = albume.tracks[3].duration;
            totalWatchLastVideo.innerHTML = albume.tracks[3].views;
            industryLastVidio.innerHTML = albume.tracks[3].industry;
            lastPicture.src = albume.tracks[3].image;

        }
    }
}

/**
 * this function is for the filling the albums on option select
 * 
 * @param {string} displayValue 
 * @param {string} inValue 
 */
function fillAlbumes(displayValue,inValue) {
    let option = document.createElement('option');
    option.value = displayValue;
    option.innerHTML = inValue;
    selectAlbume.appendChild(option);
}

/**
 * this event is calling the fillBoxes function on change
 * 
 * @event change
 */
selectAlbume.addEventListener('change', function() {
    let albumeSelected = this.value;
    // console.log(datasetArt);
    fillBoxes(albumeSelected);
    
})

/**
 * this function is calling the fillAlbumes function & the fillBoxes function
 * 
 * @param {object} albumesData 
 */
function fillAlbumesWithData(albumesData) {
    for (let i = 0; i < albumesData.artists[0].albums.length; i++) {
        let albume = albumesData.artists[0].albums[i];
        fillAlbumes(albume.name, albume.name);
        fillBoxes(albumesData.artists[0].albums[0].name);
        
    }
    
}
/**
 * this function is making the slider for the party section
 */
function makePartySlider() {
    let slider = tns({
        container: '.work-sliders-container',
        items: 3,
        mouseDrag: true,
        loop: false,
        nav: false,
        center: false,
        controlsContainer: "#custom-control-two",
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2
            },
            1024: {
                items: 3
            }},
        
    })

    document.getElementById('custom-control').style.display = 'flex';
}

makePartySlider()



/**
 * this function is making the slider for the reviws section
 */
function makeReviewsSlider() {
    let slider = tns({
        container: '.reviews-container',
        items: 1,
        mouseDrag: true,
        loop: true,
        nav: false,
        center: false,
        gutter:10,
        controlsContainer: "#custom-control-footer-slider",
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items:1
            },
            1024: {
                items: 1
            }},
        autoWidth: false,
        autoplay: true,
        autoplayButtonOutput: false,
    })
}
makeReviewsSlider()

/**
 * this function is using D3 to make the chart
 * 
 * @param {object} data the json data
 */
function putdata(data) {
    let partData = data.artists[0].albums[0].tracks;
    // The Data that we wish to display on our graph, an array of Javascript Objects
    var data = [];
    Object.assign(data, partData);
  
  // Set the dimensions of our chart to be displayed 
  var barsWidth = 210,
      barsHeight = 300,
      axisMargin = 100;
  
  var chartHeight = barsHeight+axisMargin,
      chartWidth = barsWidth+axisMargin;
  
  
  // Select the chart element on the page so we can reference it in code
  // Also set the width and height attributes of the chart SVG 
  var chart = d3.select('#chart')
      .attr('width', chartWidth+100)
      .attr('height', chartHeight);
  
  // Create a linear scale for our y-axis to map datapoint values to pixel heights of bars
  var yScale = d3.scaleLinear()
      .domain([0,d3.max(data, function(d){
      // return the value property of each datapoint so the max function can compare
          return d.views;
      })])
      .rangeRound([barsHeight, 0]);
  
  // Create a scale that returns the bands each bar should be in along the x-axis
  let xScale = d3.scaleBand()
      .domain(
        data.map(function(d){
                // For each datapoint in our data array
                // Return the name property into our new domain array
                  return d.name;
              }
          )
      )
      .rangeRound([0,barsWidth])
      .padding(0.1);
  
  // Create an SVG group that we will add the individual bar elements of our chart to
  var bars = chart.append('g')
      .attr('id', "bars-container");
  
  // Bind the data to our .bars svg elements
  // Create a rectangle for each data point and set position and dimensions using scales
  bars.selectAll('.bar')
        .data(data)
        .enter().append("rect")
            .attr('class', "bar")
            .attr('x', function(d){
                return xScale(d.name);
            })
            .attr('y', function(d){
                return yScale(d.views); 
            })
            .attr('width', xScale.bandwidth())
            .attr('height', function(d){return barsHeight-yScale(d.views);});
  
        // Move the bars so that there is space on the left for the y-axis
        bars.attr('transform', 'translate('+axisMargin+',0)');
  
        // Create a new SVG group for the y-axis elements
        // Generate the y-axis with 10 ticks and move into position
        yAxis = chart.append('g')
            .attr('id','y-axis')
            .call(d3.axisLeft(yScale).ticks(10))
            .attr('transform', 'translate('+axisMargin+',5)');
  
        // Create another group for the x-axis elements
        // Generate the x-axis using the our x scale and move into positon
        // Select the text elements and rotate by 45 degrees
        xAxis = chart.append('g')
            .attr('id', 'x-axis')
            .call(d3.axisBottom(xScale))
            .attr('transform', 'translate('+axisMargin+','+barsHeight+')')
            .selectAll("text")
            .style("text-anchor",'start')
            .attr('transform', 'rotate(45)');
  
       
}
/**
 * this function is using D3 to make the pie chart
 * 
 * @param {object} dataSales the json data for the sales chart
 */
function putdata2(dataSales) {
    let data = {};
    for (let i = 0; i < dataSales.artists[0].albums.length; i++) {
        data[dataSales.artists[0].albums[i].name] = dataSales.artists[0].albums[i].sales;
        
    }
    // set the dimensions and margins of the graph
    var width = 390
        height = 390
        margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // set the color scale
    var color = d3.scaleOrdinal()
    .domain(data)
    .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
    .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

        // Now add the annotation. Use the centroid method to get the best coordinates
    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function(d){ return d.data.key})
        .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 17)


}

let arrowUp = document.querySelector('.arrow-up');
arrowUp.style.opacity = '0';
/**
 * this event listener is for the scroll up button
 * 
 * @event scroll
 */
window.addEventListener('scroll', function() {
    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop === 0) {
        arrowUp.style.opacity = '0';
    }
    else {
        arrowUp.style.opacity = '0.8';
    }
    lastScrollTop = currentScrollTop;
})


  