var draggables
let numberOfDisks = 2
let ok = false
let callStack = []
document.getElementById("numberOfDiscss").innerHTML = numberOfDisks
document.getElementById("buttonPlus").addEventListener('click', function myFunction() {
	if (numberOfDisks < 10) {
		numberOfDisks++
		document.getElementById("numberOfDiscss").innerHTML = numberOfDisks
		var divC = document.createElement("div")
		divC.id = "item" + (11 - numberOfDisks)
		divC.classList.add("grid-item");
		document.getElementById("container1").appendChild(divC)
		divC.innerHTML = (11 - numberOfDisks)
	}
});

document.getElementById("buttonMinus").addEventListener('click', function myFunction() {
	if (numberOfDisks > 2) {
		numberOfDisks--
		document.getElementById("numberOfDiscss").innerHTML = numberOfDisks
		var divC = returnTop("container1")
		console.log(divC.id)
		divC.remove()
	}
});

document.getElementById('solution').addEventListener('click', function myFunction() {
	hanoiTower("container1", "container2", numberOfDisks);
	f(0)
});

function f(j) {
	id = setInterval(repeat, 500);
	function repeat() {
		if (ok == true) {
			window["moveN"](callStack[j][0], callStack[j][1]);
			clearInterval(id)
			ok = false
			j++
			if (j == callStack.length) return
			f(j)
		}
	}
}

window.addEventListener('keyup', function myFunction() {
	ok = true
});

var dropTarget = document.querySelector("#bigContainer");

document.getElementById('practice').addEventListener('click', function myFunction() {
	dragAndDrop()
	console.log(draggables)
});
function dragAndDrop() {
	draggables = document.querySelectorAll(".grid-item");
	for (let i = 0; i < draggables.length; i++) {
		console.log(draggables[i].id)
		draggables[i].addEventListener('mousemove', function(ev) {
			let sIe = draggables[i].parentElement.children;
			let ms = Number(window.getComputedStyle(sIe[0]).getPropertyValue("grid-row").split("/")[0]);
			for (let j = 0; j < sIe.length; j++) {
				let r = Number(window.getComputedStyle(sIe[j]).getPropertyValue("grid-row").split("/")[0]);
				if ((((r < ms) && (r !== 1)) || (ms == 1))) {
					ms = r;
				}
			}
			let driR = Number(window.getComputedStyle(draggables[i]).getPropertyValue("grid-row").split("/")[0]);
			if (driR <= ms) {
				draggables[i].setAttribute("draggable", "true");
			}
			else {
				draggables[i].setAttribute("draggable", "false");
			}
		});
	}
	for (let i = 0; i < draggables.length; i++) {
		draggables[i].addEventListener("dragstart", function(ev) {
			draggables[i].setAttribute("draggable", "false");
			ev.dataTransfer.setData("srcId", ev.target.id);
			let para = document.querySelector('#' + event.target.id);
			//ev.dataTransfer.setData("grid-row", compStyles);
		});
	}
	dropTarget.addEventListener('dragover', function(ev) {
		ev.preventDefault();
	});
	dropTarget.addEventListener('drop', function(ev) {
		ev.preventDefault();
		let srcId = ev.dataTransfer.getData("srcId");
		let gridRow = ev.dataTransfer.getData("grid-row");
		let topDt = Number(returnTop(ev.target.id).innerHTML)
		if (ev.target.id.includes("pike")) topDt = 0
		let topSt = Number(document.getElementById(srcId).innerHTML)
		console.log("topDt=" + topDt + ",topSt=" + topSt + "topDt+topSt=" + (topDt + topSt) + "topDt>topSt:" + (topDt > topSt))
		if (ev.target.id.includes("container")) { /*topDt>topSt*/
			if ((topDt == 0) || (topDt > topSt)) {
				ev.target.appendChild(document.getElementById(srcId));
				let a = ev.target.childElementCount;
				document.getElementById(srcId).style.gridRow = 900 - (a - 2) * 90 + "/ span 90";
			}
			else alert("you can't do that'")
		}
	});
}
/*******************************Hanoi Tower function************************** */
function hanoiTower(a, b, n) {
	let c = "container1";
	var containers = [a, b];
	if (containers.includes(c)) c = "container2";
	if (containers.includes(c)) c = "container3";
	if (n == 1) {
		callStack.push([a, b])
	}
	else {
		hanoiTower(a, c, n - 1)
		callStack.push([a, b])
		hanoiTower(c, b, n - 1);
	}
}
/***********************************************moveN********************************************* */
function moveN(c, b) {
	topC = returnTop(c)
	topB = returnTop(b)
	function returnM(element) {
		if (element.id.includes("pik")) return 990
		else return Number(window.getComputedStyle(element).getPropertyValue("grid-row").split("/")[0]);
	}
	let topCm = returnM(topC)
	let topBm = returnM(topB)
	document.getElementById(b).appendChild(topC);
	topC.style.gridRow = topBm - 90 + "/ span 90";
}
/*************************************************return Top*********************************************/
function returnTop(id) {
	var cn = document.getElementById(id).children;
	//console.log(id)
	if (cn[0] === void (0)) {
		console.log("error")
		//throw new Error("Something went badly wrong!");
		debugger;
	}
	let ms = Number(window.getComputedStyle(cn[0]).getPropertyValue("grid-row").split("/")[0]);
	//	console.log("ms=" + ms)
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
				if (y < (yf - inc))
					y = y + inc
			}
			if (y0 > yf) {
				if (y > (yf + inc))
					y = y - inc
			}
			element.style.gridRow = y + "/ span 90";
			if (Math.abs(y - yf) < inc) {
				element.style.gridRow = yf + "/ span 90";
				return
			}
			requestAnimationFrame(movediv3)
		}
	}
}
/***********************************************wrapMove********************************************* */
function wrapMove(div) {
	var leftpos = div.offsetLeft
	var toppos = div.offsetTop
	console.log("inside wrap:" + leftpos + "," + toppos)
	movediv()
	function movediv() {
		if (leftpos < 350) {
			leftpos += 0.1
			toppos += 0.1
		}
		div.style.left = leftpos + 'px'
		div.style.top = toppos + 'px'
		requestAnimationFrame(movediv)
	}
}
/***********************************************Move All Slow******************************************** */
function onEndOfMovement(a, b, callback, param1, param2, param3) {
	let topA = returnTop(a)
	let topB = returnTop(b)
	let topAm = Number(window.getComputedStyle(topA).getPropertyValue("grid-row").split("/")[0]);
	let topBm = Number(window.getComputedStyle(topB).getPropertyValue("grid-row").split("/")[0]);

	let p0, p1
	id = setInterval(checkContinouslyEnd, 400)
	function checkContinouslyStart() {
		p0 = Number(window.getComputedStyle(topA).getPropertyValue("grid-row").split("/")[0]);
		setTimeout(() => { p1 = Number(window.getComputedStyle(topA).getPropertyValue("grid-row").split("/")[0]) }, 600)
		if (p0 != p1) {
			id = setInterval(checkContinouslyEnd, 800)
			clearInterval(ids)
			//console.log("start moving")
		}
	}
	function checkContinouslyEnd() {
	console.log("topBm="+topBm)
		if (topA === void (0)) {
			console.log("topA undefined")
			clearInterval(id)
		}
		p = Number(window.getComputedStyle(topA).getPropertyValue("grid-row").split("/")[0]);
		/*		setTimeout(() => { p1 = Number(window.getComputedStyle(topA).getPropertyValue("grid-row").split("/")[0]) }, 1000)*/
		//	console.log(p0+","+p1) 
		/*console.log("topA.id=" + topA.id)
		console.log("topB.id=" + topB.id)
		console.log("p=" + p)
		console.log(", topBm - 90=" + topBm - 90)*/
		//console.log("p=" + p + ", topBm - 90=" + topBm - 90 + "topAm=" + topAm)
		if ((p == (topBm - 90)) && (p != topAm)) {
			callback(param1, param2, param3)
			clearInterval(id)

		}
	}
}
/*moveN("container1","container3")
moveN("container1","container2")
console.log(returnTop("container3").id)*/

//onEndOfMovement("container1", "container2", moveNmotion, "container3", "container2", 1)

/*Uncaught TypeError: Failed to execute 'getComputedStyle' on 'Window': parameter 1 is not of type 'Element'.
    at returnTop (VM134 HanoiTower.js:142)
    at moveNmotion (VM134 HanoiTower.js:159)
    at checkContinouslyEnd*/

/*hanoiTower("container1", "container2", numberOfDisks);
moveNmotion(callStack[0][0], callStack[0][1], 11);
onEndOfMovement(callStack[0][0], callStack[0][1], moveNmotion, callStack[1][0], callStack[1][1], 11)
onEndOfMovement(callStack[1][0], callStack[1][1], moveNmotion, callStack[2][0], callStack[2][1], 11)*/
/*setTimeout(function f() {
	moveNmotion(callStack[2][0], callStack[2][1], 11);
}, 6000)*/
//console.log(onEndOfMovement(callStack[1][0], callStack[1][1], returnTop, callStack[2][0]))
//onEndOfMovement(callStack[1][0], callStack[1][1], moveNmotion, callStack[2][0], callStack[2][1], 11)
//console.log(callStack[2][0]+","+callStack[2][1])
document.getElementById("solutionM").addEventListener('click', function myFunction() {
	hanoiTower("container1", "container2", numberOfDisks);
	

	for (let j = 0; j < callStack.length; j++) {
		setTimeout(function f() {
			moveNmotion(callStack[j][0], callStack[j][1], 11);
		}, 3000 * j)
		//moveNmotion(callStack[j][0], callStack[j][1], 11);
	
	
	}
});