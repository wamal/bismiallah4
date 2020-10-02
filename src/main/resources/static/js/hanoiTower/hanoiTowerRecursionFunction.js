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
/***********************Hanoi Tower function V2************************** */
function hanoiTowerV2(a, b, n) {
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