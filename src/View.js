import MissionBlock from './templates/MissionBlock.handlebars';
import DistanceBlock from './templates/DistanceBlock.handlebars';
import MissionSuccess from './templates/MissionSuccess.handlebars';
import dom from 'domquery';

export default class View {

	updateMissionBlock(config) {
		dom('#mission_block').add(MissionBlock(config));
	}
	displayFinishedNotification(config) {
		dom('body').add(MissionSuccess(config));
	}

	updateDistance(dist) {
		dom('#distance').html(DistanceBlock({dist}));
	}

	showDistanceIncreasing() {
		document.getElementById('distance').className = '';
		dom('#distance').addClass('red');
	}
	showDistanceDecreasing() {
		document.getElementById('distance').className = '';
		dom('#distance').addClass('green');
	}
}