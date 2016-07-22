// Copyright 2001, softSurfer (www.softsurfer.com)
// This code may be freely used and modified for any purpose
// providing that this copyright notice is included with it.
// SoftSurfer makes no warranty for this code, and cannot be held
// liable for any real or imagined damage resulting from its use.
// Users of this code must verify correctness for their application.
// http://softsurfer.com/Archive/algorithm_0203/algorithm_0203.htm
// Assume that a class is already given for the object:
//    Point with coordinates {float x, y;}
//===================================================================

// isLeft(): tests if a point is Left|On|Right of an infinite line.
//    Input:  three points P0, P1, and P2
//    Return: >0 for P2 left of the line through P0 and P1
//            =0 for P2 on the line
//            <0 for P2 right of the line

function sortPointX(a, b) {
	return a.lng() - b.lng();
}
function sortPointY(a, b) {
	return a.lat() - b.lat();
}

function isLeft(P0, P1, P2) {
	return (P1.lng() - P0.lng()) * (P2.lat() - P0.lat()) - (P2.lng() - P0.lng()) * (P1.lat() - P0.lat());
}
//===================================================================

// chainHull_2D(): A.M. Andrew's monotone chain 2D convex hull algorithm
// http://softsurfer.com/Archive/algorithm_0109/algorithm_0109.htm
//
//     Input:  P[] = an array of 2D points
//                   presorted by increasing x- and y-coordinates
//             n = the number of points in P[]
//     Output: H[] = an array of the convex hull vertices (max is n)
//     Return: the number of points in H[]


function chainHull_2D(P, n, H) {
	// the output array H[] will be used as the stack
	var bot = 0,
		top = (-1); // indices for bottom and top of the stack
	var i; // array scan index
	// Get the indices of points with min x-coord and min|max y-coord
	var minmin = 0,
		minmax;

	var xmin = P[0].lng();
	for (i = 1; i < n; i++) {
		if (P[i].lng() != xmin) {
			break;
		}
	}

	minmax = i - 1;
	if (minmax == n - 1) { // degenerate case: all x-coords == xmin
		H[++top] = P[minmin];
		if (P[minmax].lat() != P[minmin].lat()) // a nontrivial segment
			H[++top] = P[minmax];
		H[++top] = P[minmin]; // add polygon endpoint
		return top + 1;
	}

	// Get the indices of points with max x-coord and min|max y-coord
	var maxmin, maxmax = n - 1;
	var xmax = P[n - 1].lng();
	for (i = n - 2; i >= 0; i--) {
		if (P[i].lng() != xmax) {
			break;
		}
	}
	maxmin = i + 1;

	// Compute the lower hull on the stack H
	H[++top] = P[minmin]; // push minmin point onto stack
	i = minmax;
	while (++i <= maxmin) {
		// the lower line joins P[minmin] with P[maxmin]
		if (isLeft(P[minmin], P[maxmin], P[i]) >= 0 && i < maxmin) {
			continue; // ignore P[i] above or on the lower line
		}

		while (top > 0) { // there are at least 2 points on the stack
			// test if P[i] is left of the line at the stack top
			if (isLeft(H[top - 1], H[top], P[i]) > 0) {
				break; // P[i] is a new hull vertex
			}
			else {
				top--; // pop top point off stack
			}
		}

		H[++top] = P[i]; // push P[i] onto stack
	}

	// Next, compute the upper hull on the stack H above the bottom hull
	if (maxmax != maxmin) { // if distinct xmax points
		H[++top] = P[maxmax]; // push maxmax point onto stack
	}

	bot = top; // the bottom point of the upper hull stack
	i = maxmin;
	while (--i >= minmax) {
		// the upper line joins P[maxmax] with P[minmax]
		if (isLeft(P[maxmax], P[minmax], P[i]) >= 0 && i > minmax) {
			continue; // ignore P[i] below or on the upper line
		}

		while (top > bot) { // at least 2 points on the upper stack
			// test if P[i] is left of the line at the stack top
			if (isLeft(H[top - 1], H[top], P[i]) > 0) {
				break;  // P[i] is a new hull vertex
			}
			else {
				top--; // pop top point off stack
			}
		}

// breaks algorithm
//        if (P[i].lng() == H[0].lng() && P[i].lat() == H[0].lat()) {
//            return top + 1; // special case (mgomes)
//        }

		H[++top] = P[i]; // push P[i] onto stack
	}

	if (minmax != minmin) {
		H[++top] = P[minmin]; // push joining endpoint onto stack
	}

	return top + 1;
}
/**
 * Created by alekseymazurik on 7/22/16.
 */

//var map,
//	heatmap,
//	overlay,
//	markers         = [],
//	hullPoints      = [],
//	points          = [],
//	polygonCoords   = [],
//	polyline;

//function addMarker(location) {
//	var marker = new google.maps.Marker({
//		position: location,
//		//icon: {
//		//	path: google.maps.SymbolPath.CIRCLE,
//		//	scale: 3,
//		//	strokeWeight: 1
//		//},
//		map: map
//	});
//	markers.push(marker);
//}


//function calculateConvexHull() {
//	if (polyline) polyline.setMap(null);
//	//document.getElementById("hull_points").innerHTML = "";
//	points = [];
//
//	for (var i=0; i < markers.length; i++) {
//		points.push(markers[i].getPosition());
//	}
//	console.log(points[3]);
//	points.sort(sortPointY);
//	points.sort(sortPointX);
//	DrawHull();
//}
//
//function sortPointX(a,b) { return a.lng() - b.lng(); }
//function sortPointY(a,b) { return a.lat() - b.lat(); }

//function DrawHull() {
//	hullPoints = [];
//	chainHull_2D( points, points.length, hullPoints );
//	polyline = new google.maps.Polygon({
//		map: map,
//		paths:hullPoints,
//		fillColor:"#FF0000",
//		strokeWidth:2,
//		fillOpacity:0.5,
//		strokeColor:"#0000FF",
//		strokeOpacity:0.5
//	});
//	//displayHullPts();
//}
//
//// Sets the map on all markers in the array.
//function setMapOnAll(map) {
//	for (var i = 0; i < markers.length; i++) {
//		markers[i].setMap(map);
//	}
//}

//initMap:
//	getData().done(function(){
//		//window.procData = window.procData.splice(0,1000);
//		//polygonCoords = [];
//		//
//		//for (var i = 0; i < window.procData.length; i += 100) {
//		//	addMarker({ lat: +window.procData[i].lat, lng: +window.procData[i].lon });
//		//	//polygonCoords.push(new google.maps.LatLng(+window.procData[i].lat, +window.procData[i].lon));
//		//}
//		//
//		//calculateConvexHull();
//
//		//var polygon = new google.maps.Polygon({
//		//	paths: polygonCoords,
//		//	strokeColor: '#FF0000',
//		//	strokeOpacity: 0.8,
//		//	strokeWeight: 2,
//		//	fillColor: '#FF0000',
//		//	fillOpacity: 0.35
//		//});
//		//
//		//polygon.setMap(map);
//
//		//markers = [];
//		//console.log(window.procData[0].lat, window.procData[0].lon);
//
//		//var marker = new google.maps.Marker({
//		//	position: { lat: window.procData[0].lat, lng: window.procData[0].lon },
//		//	icon: {
//		//		path: google.maps.SymbolPath.CIRCLE,
//		//		scale: 1
//		//	},
//		//	map: map
//		//});
//
//
//		//for (var i = 0; window.procData.length; ++i) {
//		//	addMarker({ lat: +window.procData[i].lat, lng: +window.procData[i].lon });
//		//}
//
//		setMapOnAll(map);
//
//		//heatmap = new google.maps.visualization.HeatmapLayer({
//		//  data: getPoints(window.procData),
//		//  map: map
//		//});
//		//map.res
//	});

/* *** SHOW BOUNDS OF RECTANGLE ***

 //google.maps.event.addListener(map, 'bounds_changed', function() {
 //	alert(map.getBounds());
 //});
 //var myLatlng1 = new google.maps.LatLng(51.43367940150304, -0.29740137695307567);
 ////var myLatlng2 = new google.maps.LatLng(51.58325783125957, 0.04592137695317433);
 //
 //var marker1 = new google.maps.Marker({
 //	position: myLatlng1,
 //	title:"Hello World1!"
 //});
 //
 ////var marker2 = new google.maps.Marker({
 ////	position: myLatlng2,
 ////	title:"Hello World2!"
 ////});

 // To add the marker to the map, call setMap();
 //	marker1.setMap(map);
 //	marker2.setMap(map); */

//$(function(){
//	console.log(map);
//
//});

//function toggleHeatmap() {
//  heatmap.setMap(heatmap.getMap() ? null : map);
//}

//function changeGradient() {
//  var gradient = [
//    'rgba(0, 255, 255, 0)',
//    'rgba(0, 255, 255, 1)',
//    'rgba(0, 191, 255, 1)',
//    'rgba(0, 127, 255, 1)',
//    'rgba(0, 63, 255, 1)',
//    'rgba(0, 0, 255, 1)',
//    'rgba(0, 0, 223, 1)',
//    'rgba(0, 0, 191, 1)',
//    'rgba(0, 0, 159, 1)',
//    'rgba(0, 0, 127, 1)',
//    'rgba(63, 0, 91, 1)',
//    'rgba(127, 0, 63, 1)',
//    'rgba(191, 0, 31, 1)',
//    'rgba(255, 0, 0, 1)'
//  ];
//  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
//}
//
//function changeRadius() {
//  heatmap.set('radius', heatmap.get('radius') ? null : 20);
//}
//
//function changeOpacity() {
//  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
//}

//// Heatmap data
//function getPoints(data) {
//	var results = [];
//	for (var i = 0; i < data.length; ++i) {
//		results.push({
//			location: new google.maps.LatLng(data[i].lat, data[i].lon),
//			weight: data[i].norm_price
//		})
//	}
//
//	return results;
//}
/**
 * Created by alekseymazurik on 7/21/16.
 */

var map,
		overlay;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12.3,
    center: {lat: 51.536606, lng: -0.106358},
	  initialBounds: {},
    mapTypeId: google.maps.MapTypeId.MAP
  });

	var bounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(51.475011752, -0.244845),
		new google.maps.LatLng(51.5969944965, 0.0338367946017));

	var srcImage = 'http://localhost:3000/true.png';

	overlay = new USGSOverlay(bounds, srcImage, map);
}
/**
 * Created by alekseymazurik on 7/21/16.
 */

//window.procData = [];

function processedData(data) {
	var dataLines   = data.trim().split(/\r\n|\n/),
			headings    = dataLines[0].split(','),
			result      = [];

	for (var i = 1; i < dataLines.length; ++i) {
		var resultedObj  = {},
				splittedLine = dataLines[i].split(',');

		for (var j = 0; j < headings.length; j++) {
			resultedObj[headings[j]] = splittedLine[j];
		}
		result.push(resultedObj);
	}

	return result;
}

function getData() {
	var d = $.Deferred();

	$.get('median_price.txt').then(function(data){
		window.procData = processedData(data);
		d.resolve();
	}, function(e){
		console.error(e);
		d.resolve();
	});

	return d.promise();
}
USGSOverlay.prototype = new google.maps.OverlayView();

function USGSOverlay(bounds, image, map) {

	// Initialize all properties.
	this.bounds_ = bounds;
	this.image_ = image;
	this.map_ = map;

	// Define a property to hold the image's div. We'll
	// actually create this div upon receipt of the onAdd()
	// method so we'll leave it null for now.
	this.div_ = null;

	// Explicitly call setMap on this overlay.
	this.setMap(map);
}
// [END region_constructor]

// [START region_attachment]
/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
USGSOverlay.prototype.onAdd = function() {

	var div = document.createElement('div');
	div.style.borderStyle = 'none';
	div.style.borderWidth = '0px';
	div.style.position = 'absolute';

	// Create the img element and attach it to the div.
	var img = document.createElement('img');
	img.src = this.image_;
	img.style.width = '100%';
	img.style.height = '100%';
	img.style.position = 'absolute';
	img.style.imageRendering = '-webkit-optimize-contrast';
	img.style.imageRendering = 'crisp-edges';
	img.style.opacity = '0.5';
	div.appendChild(img);

	this.div_ = div;

	// Add the element to the "overlayLayer" pane.
	var panes = this.getPanes();
	panes.overlayLayer.appendChild(div);
};
// [END region_attachment]

// [START region_drawing]
USGSOverlay.prototype.draw = function() {

	// We use the south-west and north-east
	// coordinates of the overlay to peg it to the correct position and size.
	// To do this, we need to retrieve the projection from the overlay.
	var overlayProjection = this.getProjection();

	// Retrieve the south-west and north-east coordinates of this overlay
	// in LatLngs and convert them to pixel coordinates.
	// We'll use these coordinates to resize the div.
	var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
	var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

	// Resize the image's div to fit the indicated dimensions.
	var div = this.div_;
	div.style.left = sw.x + 'px';
	div.style.top = ne.y + 'px';
	div.style.width = (ne.x - sw.x) + 'px';
	div.style.height = (sw.y - ne.y) + 'px';
};
// [END region_drawing]

// [START region_removal]
// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
USGSOverlay.prototype.onRemove = function() {
	this.div_.parentNode.removeChild(this.div_);
	this.div_ = null;
};
// [END region_removal]

google.maps.event.addDomListener(window, 'load', initMap);