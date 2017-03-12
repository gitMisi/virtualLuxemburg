import input from "../input.json";
import Game from './Game';
window.initGame = function() {
	const game = new Game(input);
}