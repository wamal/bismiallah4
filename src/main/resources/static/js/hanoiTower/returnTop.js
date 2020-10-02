/**************************************return Top************************************/
function returnTop(id) {
	var cn = document.getElementById(id).children;
	if (cn[0] === void (0)) {
		console.log("error")
		debugger;
	}
	let ms = Number(window.getComputedStyle(cn[0]).getPropertyValue("grid-row").split("/")[0]);
	
	for (let j = 0; j < cn.length; j++) {
		let r = Number(window.getComputedStyle(cn[j]).getPropertyValue("grid-row").split("/")[0]);
		if ((((r < ms) && (r !== 1)) || (ms == 1))) {
			ms = r;
		}
	}
	let n = 0;
	for (let j = 0; j < cn.length; j++) {
		let r = Number(window.getComputedStyle(cn[j]).getPropertyValue("grid-row").split("/")[0]);
		if (r == ms) n = j;
	}
	var top = cn[n];
	return top
}