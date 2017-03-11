import input from "../input.json";
import Game from './Game';
import EventEmitter from 'event-emitter';
window.initGame = function() {
	const eventEmitter = EventEmitter({});
	const game = new Game(input, eventEmitter);
}