import StreetView from './StreetView';
import Player from './Player';
import {EventEmitter} from './EventEmitter';

export default class Game {
	constructor(input) {
		this._player = new Player(input);
		this._streetView = new StreetView(input, this._player);

		EventEmitter.on('position-change', this.onPositionChange.bind(this));
	}


	onPositionChange(ev) {
		this._player.updatePosition(ev.lat, ev.lng);
		console.log(this._player.getPosition());
		let isValid = this._streetView.validate();
		console.log('VALID? ', isValid)
	}
}