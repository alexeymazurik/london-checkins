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