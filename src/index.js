import input from "../input.json";
import Game from './Game';
import EventEmitter from 'event-emitter';
window.initGame = function() {
	const eventEmitter = EventEmitter({});
	const game = new Game(getRandomInput(input), eventEmitter);
}

function getRandomInput(input) {
	let ran = Math.floor(Math.random() * input.places.length);
	return input.places[ran];
}