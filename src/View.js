import MissionBlock from './templates/MissionBlock.handlebars';
import DistanceBlock from './templates/DistanceBlock.handlebars';
import MissionSuccess from './templates/MissionSuccess.handlebars';
import dom from 'domquery';
import delegate from 'delegate-dom';
import {EventEmitter} from './EventEmitter';

export default class View {

	constructor() {
		delegate.on(document.body, '.next_mission_btn', 'click', ()=> {
			EventEmitter.emit('next-mission');
		});
		delegate.on(document.body, '.minimize', 'click', ()=> {
			this.minimizeMissionBlock();
			dom('#mission_block').on('click', ()=> {
				dom('#mission_block').removeClass('minimized');
			})
		});
	}

	minimizeMissionBlock() {
		dom('#mission_block').addClass('minimized');
	}

	updateMissionBlock(config) {
		dom('#mission_block').html(MissionBlock(config));
		dom('#mission_block').removeClass('fall');
	}

	displayFinishedNotification(config) {
		dom('body').add(MissionSuccess(config));
		dom('#mission_block').addClass('fall');
	}

	hideFinishedNotification() {
		document.getElementById('overlay').remove();
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