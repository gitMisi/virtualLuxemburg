import {EventEmitter} from './EventEmitter';
import ee from 'event-emitter';

export default class StreetView {
	constructor(input, player) {
		this._player = player;
		this.initMap(input);
	}

	/**
	 *
	 * @param input
	 */
	initMap(input) {
		this.radius = 20;
		this.goal = new google.maps.LatLng(input.coordinates.lat, input.coordinates.lng);
		this._streetview = new google.maps.StreetViewService();

		this.panorama = new google.maps.StreetViewPanorama(document.getElementById('container'));

		this.panorama.addListener('links_changed', () => {
			EventEmitter.emit('position-change', {lat: this.panorama.getPosition().lat(), lng: this.panorama.getPosition().lng()});

		});
		this._streetview.getPanorama({location: input.coordinates, radius: 50}, this.processSVData.bind(this));
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
		let pos = this._player.getPosition();
		let latlng = new google.maps.LatLng(pos.lat, pos.lng);
		return (google.maps.geometry.spherical.computeDistanceBetween(latlng, this.goal) <= this.radius);
	}
}