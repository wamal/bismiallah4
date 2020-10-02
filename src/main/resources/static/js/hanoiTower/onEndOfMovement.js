function onEndOfMovement(a, b, callback, param1, param2, param3) {
	let topA = returnTop(a)
	let topB = returnTop(b)
	let topAm = Number(window.getComputedStyle(topA).getPropertyValue("grid-row").split("/")[0]);
	let topBm = Number(window.getComputedStyle(topB).getPropertyValue("grid-row").split("/")[0]);

	let p0, p1
	id = setInterval(checkContinouslyEnd, 400)

	function checkContinouslyEnd() {
		//console.log("topBm=" + topBm)
		if (topB === void (0)) {
			console.log("topB undefined")
			clearInterval(id)
		}
		p0 = Number(window.getComputedStyle(topB).getPropertyValue("grid-row").split("/")[0]);
		setTimeout(function f() {
			p1 = Number(window.getComputedStyle(topB).getPropertyValue("grid-row").split("/")[0]);
		}, 500)
		if (p0 == p1) {
			callback(param1, param2, param3)
			clearInterval(id)
		}
	}
}