import gmaps from 'gmaps';
export default class Map {
	constructor(config) {
		console.log('NEW MAP')
	}

	initMap() {
		var berkeley = {lat: 37.869085, lng: -122.254775};
		var sv = new google.maps.StreetViewService();

		panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

		// Set up the map.
		map = new google.maps.Map(document.getElementById('map'), {
			center: berkeley,
			zoom: 16,
			streetViewControl: false
		});

		// Set the initial Street View camera to the center of the map
		sv.getPanorama({location: berkeley, radius: 50}, processSVData);

		// Look for a nearby Street View panorama when the map is clicked.
		// getPanoramaByLocation will return the nearest pano when the
		// given radius is 50 meters or less.
		map.addListener('click', function(event) {
			sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
		});
	}
}