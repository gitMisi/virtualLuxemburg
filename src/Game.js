import Map from './map';
import Player from './Player';

export default class Game {
	constructor(input) {
		this._player = new Player(input.coordinates);
		this._map = new Map(input);
	}
}