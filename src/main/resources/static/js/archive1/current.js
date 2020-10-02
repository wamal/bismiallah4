
document.getElementById("button").addEventListener("click", function() {
	move("container1", "container2");
});

document.getElementById("button").addEventListener("click", function() {
	move("container1", "container3");
});
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
	//	draggables[i].setAttribute("draggable", "true");
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
	//alert("container"+ev.target.id.includes("container"));
	if (ev.target.id.includes("container")) {
		ev.target.appendChild(document.getElementById(srcId));
		let a = ev.target.childElementCount;
		document.getElementById(srcId).style.gridRow = 900 - (a - 2) * 90 + "/ span 90";
	}
});
function myFunction(event) {
	let para = document.querySelector('.' + event.target.className);
	let compStyles = window.getComputedStyle(para);
	alert(compStyles.getPropertyValue('grid-column'));
}

//move("container1", "container2");
function hanoiTower(a, b, n) {

	let c = "container1";
	var containers = [a, b];

	if (containers.includes(c)) c = "container2";
	if (containers.includes(c)) c = "container3";
	if (n == 1) {

		move(a, b);

	}
	else {
		document.getElementById("button").addEventListener("click", function() {
			hanoiTower(a, c, n - 1);
		});


		move(a, b);


		hanoiTower(c, b, n - 1);


	}
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
	
	document.getElementById(b).appendChild(top);
	let a = document.getElementById(b).childElementCount;
	document.getElementById(top.id).style.gridRow = 900 - (a - 2) * 90 + "/ span 90";
}
