window.onload = function() {
	document.getElementById("increD").addEventListener('click', function myFunction() {
		console.log("bar0.length"+bar0.length)
		if (bar0.length < 6) {
			
			bar0.push("disk"+bar0.length)
		
			var divC = document.createElement("div")
			divC.id = "disk" + (bar0.length-1)
			console.log(divC.id)
			divC.classList.add("disk");
			document.getElementById("container").appendChild(divC)
			divC.innerHTML =bar0.length-1
		}
	});


	document.getElementById("decD").addEventListener('click', function myFunction() {
		console.log("bar0.length"+bar0.length)
		if (bar0.length > 2) {
			var disk=bar0.pop()
			
			var divC = document.getElementById(disk)
			console.log(divC.id)
			divC.remove()
		}
	});
}