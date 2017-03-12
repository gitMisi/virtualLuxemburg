export default class View {
	displayWrongWayNotification(display) {
		document.getElementsByClassName('distance').innerHTML = 'You are too far away.';
	}

	displayFinishedNotification() {
		document.getElementsByClassName('mission_success')[0].classList.remove('hidden');
	}

	updateDistance(dist) {
		document.getElementById('distance').innerHTML = 'Distance from target: <span>' + dist + 'm</span>';
	}
}