export default class Player {
	constructor(position) {
		this._position = position;
	}

	getPosition() {
		return this._position;
	}

	validatePosition() {
		return true;
	}
}