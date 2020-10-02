		var draggables
let numberOfDisks = 2

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
	if (numberOfDisks> 2) {
		numberOfDisks--
		document.getElementById("numberOfDiscss").innerHTML = numberOfDisks
			var divC = returnTop("container1")
			console.log(divC.id)
			divC.remove()
	}
});

let callStack = []
hanoiTower("container1", "container2", 7);
let ok = false
f(0)
function f(j) {
	id = setInterval(repeat, 500);
	function repeat() {
		if (ok == true) {
			//	console.log("j=" + j)
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
/*let spikeLeft = 7;
let spikeMiddle = 0;
let spikeRight = 0;*/
let item7 = document.querySelector("#item7");
let item6 = document.querySelector("#item6");
let item5 = document.querySelector("#item5");
let item4 = document.querySelector("#item4");
let item3 = document.querySelector("#item3");
let item2 = document.querySelector("#item2");
let item1 = document.querySelector("#item1");
document.getElementById('practice').addEventListener('click', function myFunction() {
	dragAndDrop()
	console.log(draggables)
});

function dragAndDrop(){
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

/************************************return Top**********************************/
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

