var draggables
let numberOfDisks = 2
let ok = false
let callStack = []
let callStackV2 = []
document.getElementById("numberOfDiscss").innerHTML = numberOfDisks

var dropTarget = document.querySelector("#bigContainer");

document.getElementById('practice').addEventListener('click',
		function myFunction() {
			dragAndDrop()
			console.log(draggables)
		});

function dragAndDrop() {
	draggables = document.querySelectorAll(".grid-item");
	for (let i = 0; i < draggables.length; i++) {
		console.log(draggables[i].id)
		draggables[i].addEventListener('mousemove', function(ev) {
			let sIe = draggables[i].parentElement.children;
			let ms = Number(window.getComputedStyle(sIe[0]).getPropertyValue(
					"grid-row").split("/")[0]);
			for (let j = 0; j < sIe.length; j++) {
				let r = Number(window.getComputedStyle(sIe[j])
						.getPropertyValue("grid-row").split("/")[0]);
				if ((((r < ms) && (r !== 1)) || (ms == 1))) {
					ms = r;
				}
			}
			let driR = Number(window.getComputedStyle(draggables[i])
					.getPropertyValue("grid-row").split("/")[0]);
			if (driR <= ms) {
				draggables[i].setAttribute("draggable", "true");
			} else {
				draggables[i].setAttribute("draggable", "false");
			}
		});
	}
	for (let i = 0; i < draggables.length; i++) {
		draggables[i].addEventListener("dragstart", function(ev) {
			draggables[i].setAttribute("draggable", "false");
			ev.dataTransfer.setData("srcId", ev.target.id);
			let para = document.querySelector('#' + event.target.id);
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
		if (ev.target.id.includes("pike"))
			topDt = 0
		let topSt = Number(document.getElementById(srcId).innerHTML)
		console.log("topDt=" + topDt + ",topSt=" + topSt + "topDt+topSt="
				+ (topDt + topSt) + "topDt>topSt:" + (topDt > topSt))
		if (ev.target.id.includes("container")) { /* topDt>topSt */
			if ((topDt == 0) || (topDt > topSt)) {
				ev.target.appendChild(document.getElementById(srcId));
				let a = ev.target.childElementCount;
				document.getElementById(srcId).style.gridRow = 900 - (a - 2)
						* 90 + "/ span 90";
			} else
				alert("you can't do that'")
		}
	});
}
