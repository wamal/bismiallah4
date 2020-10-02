document.getElementById("solutionM").addEventListener('click', function myFunction() {
	hanoiTower("container1", "container2", numberOfDisks);
	for (let j = 0; j < callStack.length; j++) {
		setTimeout(function f() {
			moveNmotion(callStack[j][0], callStack[j][1], 5);
		}, 4000 * j)
	}
});