import MissionBlock from './templates/MissionBlock.handlebars';
import DistanceBlock from './templates/DistanceBlock.handlebars';
export default class View {

	updateMissionBlock(config) {
		document.getElementById('mission_block').innerHTML = MissionBlock(config);
	}
	displayWrongWayNotification(display) {
		document.getElementsByClassName('distance').innerHTML = 'You are too far away.';
	}

	displayFinishedNotification() {
		document.getElementsByClassName('mission_success')[0].classList.remove('hidden');
	}

	updateDistance(dist) {
		document.getElementById('distance').innerHTML = DistanceBlock({dist});
	}
}