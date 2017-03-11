export default class Player {
	constructor() {
		this._position = this.getRandomPosition();
	}

	getRandomPosition() {
		return {lat: '1', lng: '1'};
	}

	getPosition() {
		return this._position;
	}

	updatePosition(lat, lng) {
		this._position = {lat, lng};
	}
}