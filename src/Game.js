import StreetView from './StreetView';
import Player from './Player';
import {EventEmitter} from './EventEmitter';
import { randomGeo } from './Generator';
import { MAX_RADIUS, MIN_RADIUS } from './constants';
import { validateCoordinate, computeDistance } from './Validator';
import View from './View';

export default class Game {
	constructor(input) {
		this.input = input;
		this.lastDistance = null;
		this.view = new View;
		let pos = this.generateRandomPosition().then((pos)=> {
			this._streetView = new StreetView(input, pos);
			this._player = new Player(pos);
			this.computeDistance();
			this.view.updateMissionBlock({
				name: this.input.name,
				description: this.input.description,
				thumbnail: this.input.thumbnail,
				url: this.input.url
			})
		});

		EventEmitter.on('position-change', this.onPositionChange.bind(this));
		EventEmitter.on('position-invalid', this.onPositionInvalid.bind(this));
	}

	onPositionInvalid() {
		let pos = this.generateRandomPosition().then((pos)=> {
			this._streetView = new StreetView(this.input, pos);
			this._player = new Player(pos);
			this.view.updateMissionBlock({
				name: this.input.name,
				description: this.input.description,
				thumbnail: this.input.thumbnail,
                url: this.input.url
			})
		});
	}

	generateRandomPosition() {
		return new Promise(function (resolve, reject) {
			var ran = {}, result = {};
			do {
				ran = randomGeo({lat: this.input.coordinates.lat, lng: this.input.coordinates.lng}, MAX_RADIUS);
			}
			while (validateCoordinate(ran, this.input.coordinates, MIN_RADIUS));
			ran.lat = parseFloat(ran.lat);
			ran.lng = parseFloat(ran.lng);
			var geocoder = new google.maps.Geocoder;
			geocoder.geocode({location: ran}, function (results, status) {
				if (status == 'OK') {
					if (results) {
						result = {lat: results[1].geometry.location.lat(), lng: results[1].geometry.location.lng()}
						resolve(result);
					}
				}
				else {
					reject('No result');
				}
			});
		}.bind(this));

	}

	onPositionChange(ev) {
		this._player.updatePosition(ev.lat, ev.lng);
		let dist = this.computeDistance();
		if (this.lastDistance > dist) {
			this.view.showDistanceDecreasing();
		}
		else if (this.lastDistance < dist) {
			this.view.showDistanceIncreasing();
		}

		this.lastDistance = dist;
	}

	computeDistance() {
		let dist = computeDistance(this._player.getPosition(), this.input.coordinates);

		if (dist <= this.input.distance) {
			this.view.displayFinishedNotification(this.input);
		}
		else {
			this.view.updateDistance(Math.round(dist));
		}
		return dist;
	}
}