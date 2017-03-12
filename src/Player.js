export default class Player {
	constructor(pos) {
		this._position = pos;
	}

	getPosition() {
		return this._position;
	}

	updatePosition(lat, lng) {
		this._position = {lat, lng};
	}
}