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