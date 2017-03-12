export function validateCoordinate(pos, goal, radius) {
	let _goal = new google.maps.LatLng(goal.lat, goal.lng);
	let latlng = new google.maps.LatLng(pos.lat, pos.lng);
	return (google.maps.geometry.spherical.computeDistanceBetween(latlng, _goal) <= radius);
}

export function computeDistance(pos, goal) {
	let _goal = new google.maps.LatLng(goal.lat, goal.lng);
	let latlng = new google.maps.LatLng(pos.lat, pos.lng);
	return google.maps.geometry.spherical.computeDistanceBetween(latlng, _goal);
}