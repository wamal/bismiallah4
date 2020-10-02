window.onload = function() {


	var bar0 = ["disk0", "disk1", "disk2", "disk3", "disk4", "disk5"]
	var bar1 = []
	var bar2 = []
	var moveInfo
	bar0.name = "bar0"
	bar1.name = "bar1"
	bar2.name = "bar2"
	var callStack = []

	function hanoi(a, b, c, n) {
		if (n == 1) {
			callStack.push([a, b])
			return
		}
		hanoi(a, c, b, n - 1)
		callStack.push([a, b])
		hanoi(c, b, a, n - 1)
	}

	hanoi(bar0, bar1, bar2, 6)

	for (let i =0; i < callStack.length; i++) {
		//	console.log("n°"+i+"="+callStack[i][0].name+","+callStack[i][1].name)
	}

	document.getElementById('disk0').addEventListener('click', moveDisks)

	/**********************************************moveDisks********************************** */
	function moveDisks() {

		var param = callStack.shift();

		moveInfo = { from: param[0], to: param[1], dirH: 1, yStart: 1, yUp: 1, yDown: 1, xStart: 1, xEnd: 1, element: 1 }





		moveInfo.yDown = 100 - 8 * moveInfo.to.length
		var disk = moveInfo.from.pop()

		moveInfo.element = document.getElementById(disk)
		var element = moveInfo.element

		var lf = moveInfo.from.length
		moveInfo.yStart = 82 - 8 * lf
		var a = parseInt(moveInfo.from.name.charAt(3))
		var b = parseInt(moveInfo.to.name.charAt(3))
		if (a > b) moveInfo.dirH = -1
		var l = moveInfo.to.length
		moveInfo.yUp = 20
		moveInfo.yDown = 90 - 8 * (l + 1)
		var c = parseInt(disk.charAt(4))

		moveInfo.xStart = 3 + 2 * c + a * 33.32

		moveInfo.xEnd = moveInfo.xStart + (b - a) * 33.32
		console.log("xStart=" + moveInfo.xStart + "  ,x.End=" + moveInfo.xEnd)
		move(0.1, 0.1)
	}

	function move(incV, incH) {
		var dirV = 1
		var y = moveInfo.yStart
		var x = moveInfo.xStart
		id = setInterval(moove, 2)
		function moove() {
			if (dirV == 1) {
				if (y > moveInfo.yUp) {
					y = y - incV
				} else {
					dirV = -1
				}
			}
			else {
				if (moveInfo.dirH == 1) {
					if (x < moveInfo.xEnd) {
						x = x + incH
					}
					else if (y < moveInfo.yDown) {
						y = y + incV
					} else {
						clearInterval(id)
						moveInfo.to.push(moveInfo.element.id)
						moveDisks()
					}
				} else {
					if (x > moveInfo.xEnd) {
						x = x - incH
					} else {
						if (y < moveInfo.yDown) {
							y = y + incV
						} else {
							clearInterval(id)
							moveInfo.to.push(moveInfo.element.id)
							moveDisks()
						}
					}
				}
			}
			moveInfo.element.style.top = y + "%"
			moveInfo.element.style.left = x + "%"
		}
	}
}