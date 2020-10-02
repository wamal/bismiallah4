var dropTarget = document.querySelector("#wrapper");
var draggables = document.querySelectorAll(".task");
var task1 = document.querySelector("#task1");

task1.setAttribute("draggable", "true");

/*
What to Drag - ondragstart and setData()
Then, specify what should happen when the element is dragged.

In the example above, the ondragstart attribute calls a function, 
drag(event), that specifies what data to be dragged.

The dataTransfer.setData() method sets the data type and the 
value of the dragged data:
*/

for (let i = 0; i < draggables.length; i++) {
	draggables[i].addEventListener("dragstart", function (evv) {
		evv.dataTransfer.setData("srcId", draggables[i].id);
	});
}

/*
Where to Drop - ondragover
The ondragover event specifies where the dragged data can be dropped.

By default, data/elements cannot be dropped in other 
elements. 
To allow a drop, we must prevent the default handling of 
the element.

This is done by calling the event.preventDefault() method for 
the ondragover event:
*/

dropTarget.addEventListener('dragover', function (ev) {
	ev.preventDefault();
});

dropTarget.addEventListener('drop', function (evi) {
	evi.preventDefault();
	let target = evi.target;
	let droppable = target.classList.contains('box');
	let srcId = evi.dataTransfer.getData("srcId");
	if (droppable) {
		evi.target.appendChild(document.getElementById(srcId));
	}
});
