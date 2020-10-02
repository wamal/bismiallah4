//hanoiTower("container1", "container3", 3);
top1 = returnTop("container1")
move("container1", "container2");
console.log(whichElementIsMoving())
//move("container1", "container3");
top2 = returnTop("container2")
//console.log(top1.id)
//isElementMoving(top1)
//move("container1", "container2")

//checkEndOfTransition(top1,top2,move,"container1","container3")

//console.log(checkEndOfTransition("container1", "container2"))


//move("container1", "container3");
//move("container2", "container3");


var dropTarget = document.querySelector("#bigContainer");
let spikeLeft = 7;
let spikeMiddle = 0;
let spikeRight = 0;
let item7 = document.querySelector("#item7");
let item6 = document.querySelector("#item6");
let item5 = document.querySelector("#item5");
let item4 = document.querySelector("#item4");
let item3 = document.querySelector("#item3");
let item2 = document.querySelector("#item2");
let item1 = document.querySelector("#item1");
var draggables = document.querySelectorAll(".grid-item");
for (let i = 0; i < draggables.length; i++) {
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
		ev.dataTransfer.setData("grid-row", compStyles);
	});
}
dropTarget.addEventListener('dragover', function(ev) {
	ev.preventDefault();
});
dropTarget.addEventListener('drop', function(ev) {
	ev.preventDefault();
	let srcId = ev.dataTransfer.getData("srcId");
	let gridRow = ev.dataTransfer.getData("grid-row");
	if (ev.target.id.includes("container")) {
		ev.target.appendChild(document.getElementById(srcId));
		let a = ev.target.childElementCount;
		document.getElementById(srcId).style.gridRow = 900 - (a - 2) * 90 + "/ span 90";
	}
});
/********************************Hanoi Tower function************************** */
function hanoiTower(a, b, n) {

	let c = "container1";
	var containers = [a, b];

	if (containers.includes(c)) c = "container2";
	if (containers.includes(c)) c = "container3";
	if (n == 1) {
		move(a, b);
	}
	else {
		hanoiTower(a, c, n - 1)
		move(a, b);
		hanoiTower(c, b, n - 1);
	}
}
/********************************move function********************************** */
var active = false;
function moveN(c, b) {
	var cn = document.getElementById(c).children;
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
	//alert(Number(window.getComputedStyle(top).getPropertyValue("grid-row").split("/")[0]));
	document.getElementById(b).appendChild(top);
	//	top.innerHTML=Number(window.getComputedStyle(top).getPropertyValue("grid-row").split("/")[0]);
	let a = document.getElementById(b).childElementCount;
	var y0 = Number(window.getComputedStyle(top).getPropertyValue("grid-row").split("/")[0]);
	var yf = 900 - (a - 2) * 90;
	setTimeout(function() {
		var id = setInterval(frame, 1);

		document.getElementById(top.id).style.gridRow = step + "/ span 90";
		var step = y0;
		function frame() {
			document.getElementById(top.id).innerHTML = "yf:" + yf + ",y0:" + y0 + "step:" + step;
			if (yf == y0) clearInterval(id);
			if (yf > y0) {
				step = step + 5;
			} else {
				step = step - 5;
			}
			if (Math.abs(step - yf) < 1) clearInterval(id);
			document.getElementById(top.id).style.gridRow = step + "/ span 90";
		}
	}, 500);

}
function move(c, b) {
	var cn = document.getElementById(c).children;
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
	//alert(Number(window.getComputedStyle(top).getPropertyValue("grid-row").split("/")[0]));
	document.getElementById(b).appendChild(top);
	//	top.innerHTML=Number(window.getComputedStyle(top).getPropertyValue("grid-row").split("/")[0]);
	let a = document.getElementById(b).childElementCount;
	var y0 = Number(window.getComputedStyle(top).getPropertyValue("grid-row").split("/")[0]);
	var yf = 900 - (a - 2) * 90;
	var inc = 1
	var step = y0;
	frame(); //frame(); frame(); frame(); frame(); frame(); frame(); frame(); frame(); frame(); frame(); frame();
	function frame() {
		document.getElementById(top.id).innerHTML = "yf:" + yf + ",y0:" + y0 + "step:" + step;

		if ((yf > y0) && (Math.abs(step - yf) > inc)) {
			step = step + inc
		} if ((yf < y0) && (Math.abs(step - yf) > inc)) {
			step = step - inc
		}
		document.getElementById(top.id).style.gridRow = step + "/ span 90";
		requestAnimationFrame(frame)
		if (Math.abs(step - yf) <= inc) {
			document.getElementById(top.id).style.gridRow = yf + "/ span 90";
			document.getElementById(top.id).innerHTML = "yf:" + yf + ",y0:" + y0 + "step:" + step;
		}
	}
}
function returnTop(id) {
	var cn = document.getElementById(id).children;
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
//alert(returnTop("container1"))
/***************************************Check Transition End************************ */
function checkEndOfTransition(top1, top2, callback, a, b) {
	id = setInterval(checkCont, 200)
	function checkCont() {
		let roof1 = Number(window.getComputedStyle(top1).getPropertyValue("grid-row").split("/")[0]);
		let roof2 = Number(window.getComputedStyle(top2).getPropertyValue("grid-row").split("/")[0]);
		if (top2.id.includes("pik")) roof2 = 900
		if (Math.abs(roof1 - roof2) < 2) {

			clearInterval(id)
			callback(a, b)
		}
		console.log("roof1:" + roof1 + ",roof2:" + roof2 + "endOfTransition:" + endOfTransition)
	}

}
//whichElementIsMoving()
/***************************************Check End Of Transition********************************* */

/**************************************Which element is moving************************************** */
function fireCalbackFunctionWhenMovingElementHasStoppedMoving(callback,a,b,c) {
	var movingElement
	var elements = []
	var position0 = []
	var position1 = []
	var isMoving = []
	for (i = 0; i < 3; i++) {
		elements[i] = document.getElementById("item" + (i + 5))
		position0[i] = Number(window.getComputedStyle(elements[i]).getPropertyValue("grid-row").split("/")[0])
		isMoving[i]  = false
	}
	setTimeout(() => {
		for (i = 0; i < 3; i++) {
			position1[i] = Number(window.getComputedStyle(elements[i]).getPropertyValue("grid-row").split("/")[0]);
			if (position1[i] != position0[i]) {
				isMoving[i] = true
				movingElement = elements[i]	
			}
		}
	
	},
		300);


}
/**************************************isElementMoving********************************************** */
function isElementMoving(element) {
	let moving = false
	id = setInterval(continousCheck, 500)
	/*************************************Continous check function************************************* */
	function continousCheck() {
		let p0 = Number(window.getComputedStyle(element).getPropertyValue("grid-row").split("/")[0]);
		let pf = 0
		setTimeout(() => {
			pf = Number(window.getComputedStyle(element).getPropertyValue("grid-row").split("/")[0]);
		},
			300);

		if (p0 != pf) {
			moving = true
		}
		if (moving = false) clearInterval(id)
		console.log("p0=" + p0 + ",pf=" + pf + ",false=" + false)
		return moving
	}
}
//askMom();