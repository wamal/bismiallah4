
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
