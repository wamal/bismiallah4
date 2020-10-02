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