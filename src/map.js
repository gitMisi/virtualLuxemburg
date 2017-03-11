import gmaps from 'gmaps';
export default class Map {
	constructor(input) {
		this.initMap(input);
	}

	/**
	 *
	 * @param input
	 */
	initMap(input) {
		this.radius = 20;
		this.center = new google.maps.LatLng(input.geometry.coordinates.lat, input.geometry.coordinates.lng);
		var sv = new google.maps.StreetViewService();

		this.panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

		this.panorama.addListener('links_changed', () => {
			console.log(this.panorama.getPosition().lat());
			this.currentPosition =
				new google.maps.LatLng(this.panorama.getPosition().lat(), this.panorama.getPosition().lng());
		});
		sv.getPanorama({location: berkeley, radius: 50}, this.processSVData.bind(this));
	}

	processSVData(data, status) {
		if (status === 'OK') {
			var marker = new google.maps.Marker({
				position: data.location.latLng,
				map: this.map,
				title: data.location.description
			});

			this.panorama.setPano(data.location.pano);
			this.panorama.setPov({
				heading: 270,
				pitch: 0
			});
			this.panorama.setVisible(true);

			marker.addListener('click', ()=> {
				var markerPanoID = data.location.pano;
				this.panorama.setPano(markerPanoID);
				this.panorama.setPov({
					heading: 270,
					pitch: 0
				});
				this.panorama.setVisible(true);
			});
		} else {
			console.error('Street View data not found for this location.');
		}
	}

	validate() {
		return (google.maps.geometry.spherical.computeDistanceBetween(this.currentPosition, this.center) <= this.radius);
	}
}