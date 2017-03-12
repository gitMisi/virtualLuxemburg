import {EventEmitter} from './EventEmitter';
import ee from 'event-emitter';

export default class StreetView {
	constructor(input, randomPos) {
		this.initial = true;
		this.initMap(input, randomPos);
	}

	/**
	 *
	 * @param input
	 */
	initMap(input, randomPos) {
		this.goal = new google.maps.LatLng(input.coordinates.lat, input.coordinates.lng);
		this._streetview = new google.maps.StreetViewService();

		this.panorama = new google.maps.StreetViewPanorama(document.getElementById('container'));
		this._streetview.getPanorama({location: randomPos}, this.processSVData.bind(this));

		this.panorama.addListener('links_changed', () => {
			if (this.initial) {
				this.initial = false;
			}
			EventEmitter.emit('position-change', {
				lat: this.panorama.getPosition().lat(),
				lng: this.panorama.getPosition().lng()
			});

		});
	}

	processSVData(data, status) {
		if (status === 'OK') {
			if (data.copyright.indexOf('Google') == -1 || data.links.length === 0) {
				EventEmitter.emit('position-invalid');
			}
			console.log('daTA: ', data)
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
			EventEmitter.emit('position-invalid')
			console.error('Street View data not found for this location.');
		}
	}

}