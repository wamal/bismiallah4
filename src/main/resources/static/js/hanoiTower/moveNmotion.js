/**********************************************moveNmotion******************************************* */
function moveNmotion(c, b, inc) {
	console.log("move from:" + c + " to:" + b)
	topC = returnTop(c)
	topB = returnTop(b)
	function returnM(element) {
		if (element.id.includes("pik")) return 990
		else return Number(window.getComputedStyle(element).getPropertyValue("grid-row").split("/")[0]);
	}
	let topCm = returnM(topC)
	let topBm = returnM(topB)
	//movePtoP(topCm,0, topC)
	document.getElementById(b).appendChild(topC);
	movePtoP(0, topBm - 90, topC)
	function movePtoP(y0, yf, element) {
		var y = y0
		let i = 0
		movediv3(); movediv3(); movediv3();
		function movediv3() {
			if (y0 < yf) {
				if (y < (yf))
					y = y + inc
			}
			if (y0 > yf) {
				if (y > (yf-inc))
					y = y - inc
			}
			element.style.gridRow = y + "/ span 90";
			if (Math.abs(y - yf) < inc) {
			//	element.style.gridRow = yf + "/ span 90";
				return
			}
			requestAnimationFrame(movediv3)
		}
	}
}